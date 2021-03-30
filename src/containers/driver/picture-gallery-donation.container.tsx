import {Donation, StaticContent} from "../../domain";
import {BaseContainer} from "./base.container";
import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Button} from "@zendeskgarden/react-buttons";
import {DonationItem, DonationItemType} from "../../domain/Donation";
import _ from "lodash";
import {LG, Paragraph} from "@zendeskgarden/react-typography";
import {FileUpload, Input} from "@zendeskgarden/react-forms";
import Api from "../../services/api.service";
import {DropEvent, FileRejection, useDropzone} from "react-dropzone";
import {Space} from "../../components";

export const PictureGaleryDonationContainer = () => {
    const history = useHistory();
    const [donation, setDonation] = useState<Donation>()
    const [donationContent, setDonationContent] = useState<DonationItem[]>([])
    const {actions} = useContext(DonationContext)

    const [blocked, setBlocked] = useState(true);

    const params = useParams<{ id: string }>()
    const {id} = params;

    const createDonationItems = (n: number, type: DonationItemType): DonationItem[] => {
        if (n > 0) {
            return _.times(n, () => new DonationItem(type))
        } else {
            return []
        }
    }

    useEffect(() => {
        actions.getDonation(id).then(setDonation);
    }, [])

    useEffect(() => {
        if (donation) {

            const keys: ('largeItems' | 'smallItems' | 'bags' | 'boxes')[] = ['largeItems', 'smallItems', 'bags', 'boxes']
            const spec = donation.adjustedSpec;
            const items: DonationItem[] = []
            keys.forEach(key => {
                if (spec[key] > 0) {
                    const donationItems = createDonationItems(spec[key], DonationItemType[key]);
                    items.push(...donationItems);
                }
            })

            setDonationContent(items);
        }
    }, [donation])

    useEffect(() => {
        const picturesAvailable = donationContent.reduce((current,item) => current + item.photos.length, 0)
        setBlocked(picturesAvailable < donationContent.length);
    }, [donationContent])

    const progress = () => {
        if(donation){
            donation.content = donationContent;
            actions.updateDonation(donation!).then(() => {
                history.push(`/donations/${id}/load-up-and-move-out`)
            })
        }
    }




    const onFileAdded = (item: DonationItem, files: FileList | null, index: number) => {
        if (files && files[0]){
            const formData = new FormData();
            formData.append('file', files[0])
            Api.$<StaticContent>('files').upload(formData).then((result) => {
                item.photos.push(result.url);
                donationContent[index] = item;
                setDonationContent([...donationContent])
            })
        }

    }


    return (
        <BaseContainer title={"Pictures!"} showBackButton showAsModal>
            <>
                {donationContent.map((item, index) => (
                    <div key={index}>
                        <LG>{_.startCase(item.type)}</LG>
                        <Space size={10}/>
                        <Input type={'file'} name={index+""} onChange={(e) => {
                            onFileAdded(item, e.target.files, index);
                        }}/>
                        <Space size={20}/>
                    </div>
                ))}
                <Button
                    onClick={progress}
                    disabled={blocked}
                    isStretched>
                    Save
                </Button>
            </>
        </BaseContainer>
    )
}
