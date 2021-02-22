import {BaseContainer} from "./base.container";
import React, {useContext, useEffect, useState} from "react";
import {DropEvent, FileRejection, useDropzone} from "react-dropzone";
import {Well} from "@zendeskgarden/react-notifications";
import {Field, FileUpload, Hint, Input, Label} from "@zendeskgarden/react-forms";
import styled from "styled-components";
import {LG} from "@zendeskgarden/react-typography";
import {Col, Row} from "@zendeskgarden/react-grid";
import {Button} from "@zendeskgarden/react-buttons";
import Api from "../../services/api.service";
import {DonationContext} from "../../context";
import {useHistory, useParams} from "react-router-dom";
import {Donation} from "../../services/domain";
import {Inline} from "@zendeskgarden/react-loaders";


export const DonationPhotosContainer = () => {
    const params = useParams<{id: string}>()
    const {actions} = useContext(DonationContext)
    const history = useHistory()
    const {id} = params

    const [isLoading, setLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([])
    const [donation, setDonation] = useState<Donation>()

    useEffect(() => {
        if (id){
            Api.setToken("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaWxvc0Blc3NlbnRpYWx6LmlvIiwiaWF0IjoxNjEzNTUxNjY2fQ.nw08ojnwfWVDd88BCqd8IPlDZ41B7gy4u9n7thTPruw")
            actions.getDonation(id).then(setDonation);
        }
    }, [])

    const onDrop = React.useCallback((acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
        setFiles([...files, ...acceptedFiles])
    }, [files]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: ['image/jpeg', 'image/png', 'image/gif'],
        onDrop
    });

    const uploadFiles = () => {
        setLoading(true);
        const formData = new FormData()
        files.forEach((file) => {
            formData.append('files[]', file)
        })

        Api.$('files/bulk').upload(formData).then(
            result => {
                if (donation){
                    actions.updateDonation({
                        ...donation,
                        photos: result
                    } as Donation).then(() => history.replace(`/donations/${donation.id}`))
                }
            }
        )
    }


    return (
        <BaseContainer showBackButton title={"Donation photos"} subtitle={"Take photos of each item being donated"}>
            <>
                <StyledWell key={`donation-photos`}>
                    <StyledField>
                        <Label>Photo upload</Label>
                        <Hint>
                            Pick the photos from your device.
                        </Hint>
                        <FileUpload {...getRootProps()} isDragging={isDragActive}>
                            {isDragActive ? (
                                <span>Drop files here</span>
                            ) : (
                                <span>Choose photos</span>
                            )}
                            <Input {...getInputProps()} />
                        </FileUpload>
                    </StyledField>
                </StyledWell>
                <ThumbContainer>
                    {files.map(file => (
                        <Thumb key={file.name} xs={4}>
                            <ThumbInner>
                                <img src={URL.createObjectURL(file)} alt=""/>
                            </ThumbInner>
                        </Thumb>
                    ))}
                </ThumbContainer>

                <StyledField>
                    <Button onClick={uploadFiles} isPrimary isStretched>
                        {isLoading ? (<Inline/>) : "Upload photos"}
                    </Button>
                </StyledField>
            </>
        </BaseContainer>
    )
}

const StyledWell = styled(Well)`
  margin: 10px 0;
`

const StyledField = styled(Field)`
  margin-bottom: 15px;
  margin-top: 15px;
`
const StyledTitle = styled(LG)`
  margin-bottom: 10px;
`

const ThumbContainer = styled(Row)`
  margin: 1px
`
const Thumb = styled(Col)`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`
const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
  img{
    display: block;
    width: auto;
    margin: auto;
    height: 100%;
    object-fit: contain;
  }
`
