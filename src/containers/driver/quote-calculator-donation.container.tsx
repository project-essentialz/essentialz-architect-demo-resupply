import {Donation} from "../../domain";
import {BaseContainer} from "./base.container";
import React, {useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Space} from "../../components";
import {Button} from "@zendeskgarden/react-buttons";
import {Well} from "@zendeskgarden/react-notifications";
import {XL} from "@zendeskgarden/react-typography";
import {CounterItem} from "../../components/counter-item.c";
import {DonationSpec} from "../../domain/DonationSpec";

export const QuoteCalculatorDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const [spec, setSpec] = useState<DonationSpec>()

    const {actions} = useContext(DonationContext)

    const params = useParams<{ id: string }>()
    const {id} = params;

    useEffect(() => {
        actions.getDonation(id).then((d) => {
            setDonation(d);
            setSpec(d.spec)
        });
    }, [])

    useEffect(() => {
    }, [donation])

    const progress = () => {
        if (donation){
            donation.adjustedSpec = spec!;
            actions.updateDonation(donation).then(() => {
                history.replace("/")
            })
        }
    }

    const updateEstimate = (field: string, value: number) => {
        setSpec({
            ...spec,
            [field]: value
        } as DonationSpec)
    }

    return (
        <BaseContainer title={"Quote calculator"} showBackButton showAsModal>
            <>
                {spec && (
                    <>
                        <Well style={{textAlign: "center"}}>
                            <XL>
                                Total: ${Donation.getEstimate(spec!)}
                            </XL>
                        </Well>

                        <Space size={20}/>
                        <Well>
                            <CounterItem value={spec.largeItems} title={"Large items"} field={'largeItems'}
                                         onChange={updateEstimate}/>
                            <CounterItem value={spec.smallItems} title={"Small items"} field={'smallItems'}
                                         onChange={updateEstimate}/>
                            <CounterItem value={spec.boxes} title={"Boxes"} field={'boxes'} onChange={updateEstimate}/>
                            <CounterItem value={spec.bags} title={"Bags"} field={'bags'} onChange={updateEstimate}/>
                            <CounterItem value={spec.staircases} title={"Staircases"} field={'staircases'}
                                         onChange={updateEstimate}/>
                            <CounterItem value={spec.disassembly} title={"Disassembly"} field={'disassembly'}
                                         onChange={updateEstimate}/>
                        </Well>
                    </>
                )}
                <Space size={50}/>
                <Button
                    onClick={progress}
                    isStretched> Adjust</Button>
            </>
        </BaseContainer>
    )
}
