import {BaseContainer} from "./base.container";
import React, {useContext, useEffect, useState} from "react";
import {AutocompleteInput, TableComponent} from "../../components";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Well} from "@zendeskgarden/react-notifications";
import {DonationContext} from "../../context";
import {field} from "../../utility/field";
import {Body, Close, Footer, FooterItem, Header, Modal} from "@zendeskgarden/react-modals";
import {Button} from "@zendeskgarden/react-buttons";
import {useHistory} from "react-router-dom";
import {CSVLink} from "react-csv";
import {Checkbox, Field, Label} from "@zendeskgarden/react-forms";
import {Donation} from "../../domain/Donation";


type Props = {}

const fieldsAvailableForExport = [
    {
        key: 'donationCode',
        description: 'Donation ID',
        selected: false
    },
    {
        key: 'additionalInformation',
        description: "Additional information",
        selected: false
    },
    {
        key: 'address',
        description: "Address",
        selected: false
    }
]

export const DonationsFunnelContainer = (props: Props) => {
    const history = useHistory();

    const {donations, actions} = useContext(DonationContext);

    const [matchedDonations, setMatchedDonations] = useState<Donation[]>(donations)
    const [donors, setDonors] = useState<string[]>([])
    const [selectedDonor, setSelectedDonor] = useState<string | null>(null)
    const [selectedFields, setSelectedFields] = useState(fieldsAvailableForExport)
    const [exportData, setExportData] = useState<Partial<Donation>[]>(donations)

    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        actions.getAllDonations('charity_id=af9de00f-77c8-40c0-bd80-8938fdb21d50');
    }, [])
    useEffect(() => {
        const extractedDonorNames = donations.map((donation: Donation) => donation.donor.name!);
        setDonors(extractedDonorNames)
        setMatchedDonations(donations);
    }, [donations])
    useEffect(() => {
        if (selectedDonor) {
            setMatchedDonations(donations.filter((donation) => donation.donor.name === selectedDonor))
        } else {
            setMatchedDonations(donations)

        }
    }, [selectedDonor])

    const onDonationIdClicked = (donationCode: string, rowData: any) => {}
    const openDonationDetailsView = (donation: Donation) => {
        history.push(`/donations/${donation.id}`)
    }
    const onFieldForExportChanged = (index: number) => {
        const _selectedFields = [...selectedFields];
        _selectedFields[index].selected = !_selectedFields[index].selected;
        setSelectedFields(_selectedFields);
        setExportData(donations.map((donation) => {
            const item = {} as Donation;
            _selectedFields.forEach((field) => {
                if (field.selected) {
                    // @ts-ignore
                    item[field.key] = donation[field.key]
                }
            })
            return item
        }))
    }

    const fields = [
        field('donationCode', 'Donation ID', true, onDonationIdClicked),
        field('donorName', 'Donor name'),
        field('phone', 'phone'),
        field('donationStatus', 'Status', true)
    ]
    const extraButtons: { title: string, onClick: () => void }[] = [
        {
            title: 'Export to CSV',
            onClick: () => {
                setExportModalVisible(true)
            }
        }
    ]

    return (
        <BaseContainer title={'Donations funnel'} subtitle={'List of all donations in the system'}
                       extraButtons={extraButtons}>
            <>
                <Well>
                    <Row>
                        <Col>
                            <AutocompleteInput
                                options={donors}
                                onValueSelected={setSelectedDonor}
                                label={"Search by donor"}/>
                        </Col>
                    </Row>
                </Well>
                <div style={{height: 30}}/>
                <Well>
                    <TableComponent fields={fields} onRowClicked={openDonationDetailsView} data={matchedDonations}/>
                </Well>

                {exportModalVisible && (
                    <Modal onClose={() => setExportModalVisible(false)}>
                        <Header>Select fields to export</Header>
                        <Body>
                            {selectedFields.map((field, index) => (
                                <Field>
                                    <Checkbox checked={field.selected} onChange={() => {
                                        onFieldForExportChanged(index)
                                    }}>
                                        <Label>{field.description}</Label>
                                    </Checkbox>
                                </Field>
                            ))}
                        </Body>
                        <Footer>
                            <FooterItem>
                                <Button onClick={() => setExportModalVisible(false)} isBasic>
                                    Cancel
                                </Button>
                            </FooterItem>
                            <FooterItem>
                                <CSVLink filename={"resupply-data-export.csv"} data={exportData}>Export data</CSVLink>
                            </FooterItem>
                        </Footer>
                        <Close aria-label="Close modal"/>
                    </Modal>
                )}
            </>
        </BaseContainer>
    )
}
