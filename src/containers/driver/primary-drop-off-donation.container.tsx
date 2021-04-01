import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Paragraph, Span, XL} from "@zendeskgarden/react-typography";
import {Space} from "../../components";
import {Button, IconButton} from "@zendeskgarden/react-buttons";
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import ReactInputMask from "react-input-mask";
import {Col, Row} from "@zendeskgarden/react-grid";

import {ReactComponent as PlusIcon} from "../../assets/icons/plus-light.svg";
import {ReactComponent as MinusIcon} from "../../assets/icons/minus-light.svg";
import {Well} from "@zendeskgarden/react-notifications";
import {DonationItem, DonationStatus, DropOffOutcome} from "../../domain/Donation";
import _ from "lodash";
import * as yup from "yup";


const schema = yup.object().shape({
    pocName: yup.string().required(),
    pocPhone: yup.string().matches(/^(\+1)\d{10}/g).required(),
})

export const PrimaryDropOffDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const {actions} = useContext(DonationContext)

    const [outcome, setOutcome] = useState<DropOffOutcome>(new DropOffOutcome())
    const [acceptedIndexes, setAcceptedIndexes] = useState<number[]>([])
    const [declinedIndexes, setDeclinedIndexes] = useState<number[]>([])

    const [disabled, setDisabled] = useState<boolean>(true)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    useEffect(() => {
        if (acceptedIndexes.length + declinedIndexes.length !== donation?.content?.length){
            setDisabled(true);
        }else{
            schema.validate(outcome).then((result) => {
                setDisabled(false)
            }).catch(() => {
                setDisabled(true)
            })
        }
    }, [outcome, acceptedIndexes, declinedIndexes])

    const updatePocInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        const o = new DropOffOutcome();
        Object.assign(o, outcome);
        _.set(o, name, value);
        setOutcome(o)
    }

    const progress = () => {
        if(donation){
            donation.donationStatus = DonationStatus.completed;
            actions.updateDonation(donation!).then(() => {
                history.push(`/donations/${id}/completed-primary-drop-off`)
            })
        }

    }
    const reset = () => {
        setAcceptedIndexes([]);
        setDeclinedIndexes([])
        setOutcome(new DropOffOutcome())
    }


    const addToAccepted = (index: number) => {
        if (_.includes(acceptedIndexes, index)){
             setAcceptedIndexes(_.remove(acceptedIndexes, index))
        }else{
            setAcceptedIndexes([...acceptedIndexes, index])
        }
    }

    const addToDeclined = (index: number) => {
        if (_.includes(declinedIndexes, index)){
            setDeclinedIndexes(_.remove(declinedIndexes, index))
        }else{
            setDeclinedIndexes([...declinedIndexes, index])
        }
    }

    const addItem = (item: DonationItem) => {
        setOutcome({
            ...outcome,
            acceptedItems: [...outcome.acceptedItems, item]
        })
    }

    const itemPicked = (index: number) => {
        return _.includes(acceptedIndexes, index) || _.includes(declinedIndexes, index)
    }

    const renderAvailableItem = (item: DonationItem, index: number) => (
        <Row>
            <Col style={{textAlign: "center"}}>
                <IconButton
                    onClick={() => {
                        addToDeclined(index)
                    }}
                    isDanger
                    isBasic={false}
                    isPill={false}
                    size={"small"}>
                    <MinusIcon/>
                </IconButton>
            </Col>
            <Col style={{textAlign: "center"}}>
                <IconButton
                    onClick={() => {
                        addItem(item);
                        addToAccepted(index)
                    }}
                    isPrimary
                    isBasic={false}
                    isPill={false}
                    size={"small"}>
                    <PlusIcon/>
                </IconButton>
            </Col>
        </Row>
    )

    const renderPickedItem = (item: DonationItem, index: number) => {
        const text = _.includes(acceptedIndexes, index) ? 'Accepted' : 'Declined';
        return (
            <Row>
                <Col style={{margin: 5, textAlign: "center"}}>
                    <Paragraph>{text}</Paragraph>
                </Col>
            </Row>
        )
    }

    return (
        <BaseContainer title={"First Drop-off"} subtitle={donation?.primaryDropOff?.name} showBackButton showAsModal>
            <>

                <Field>
                    <Label>Loading Dock Manager</Label>
                    <Input name={'pocName'} onChange={updatePocInfo}/>
                </Field>

                <Field>
                    <Label>Manager Phone Number</Label>
                    <ReactInputMask name={'pocPhone'} mask={"+19999999999"} onChange={updatePocInfo}>
                        <Input/>
                    </ReactInputMask>
                </Field>

                <Space size={50}/>

                {donation && (
                    <Row>
                        {
                            donation.content?.map((item, index) => (
                                <Col xs={6} style={{marginBottom: 10}} key={`${item.type}-${index}`}>
                                    <Well style={{padding: 5}}>
                                        <img src={item.photos[0]} alt=""/>
                                        {itemPicked(index) ? renderPickedItem(item, index) : renderAvailableItem(item, index)}
                                    </Well>
                                </Col>
                            ))
                        }
                    </Row>
                )}

                <Space size={50}/>

                <Button onClick={progress} disabled={disabled} isStretched>Complete Drop-off</Button>
                <Space size={50}/>
                <Paragraph style={{textAlign: "center"}}>You can always reset your selection if you made a mistake.</Paragraph>
                <Space size={5}/>
                <Button onClick={reset} isStretched isDanger>Reset selection</Button>
            </>
        </BaseContainer>
    )
}
