import React, {useEffect, useState} from 'react';
import {Autocomplete, Dropdown, Field, Item, Label, Menu} from '@zendeskgarden/react-dropdowns';
import {ReactComponent as SearchIcon} from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';
import {Button} from "@zendeskgarden/react-buttons";
import {Col, Row} from "@zendeskgarden/react-grid";


type Props = {
    label: string;
    options: string[]
    disabled?: boolean
    onValueSelected?: (value: string | null) => void
    value?: string
    hasClear?: boolean
    hideLabel?: boolean
}
export const AutocompleteInput = (props: Props) => {
    const {label, options, disabled, onValueSelected, value, hasClear, hideLabel} = props;

    const [selectedItem, setSelectedItem] = useState(value || null);
    const [inputValue, setInputValue] = useState(value || '');
    const [matchingOptions, setMatchingOptions] = useState<string[]>(options);

    const filterMatchingOptions = (value: string) => {
        const matchedOptions = options.filter(
            option => option.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
        );

        setMatchingOptions(matchedOptions);
    }

    useEffect(() => {
        setMatchingOptions(options)
    }, [options])

    useEffect(() => {
        if (onValueSelected) {
            onValueSelected(selectedItem);
        }
    }, [selectedItem])

    useEffect(() => {
        filterMatchingOptions(inputValue);
    }, [inputValue]);

    return (
        <Dropdown
            inputValue={inputValue}
            selectedItem={selectedItem}
            onSelect={item => setSelectedItem(item)}
            onInputValueChange={value => setInputValue(value)}
            downshiftProps={{defaultHighlightedIndex: 0}}
        >
            <Field>
                {!hideLabel && (<Label>{label}</Label>)}
                <Autocomplete
                    disabled={disabled}
                    start={<SearchIcon/>}>{selectedItem}
                </Autocomplete>
            </Field>
            {hasClear && (
                <Row style={{marginTop: 10}}>
                    <Col textAlign={'end'}>
                        <Button
                            onClick={() => {
                                setSelectedItem(null)
                            }}
                            size={"small"}>
                            Clear
                        </Button>
                    </Col>
                </Row>
            )}
            <Menu>
                {matchingOptions.length ? (
                    matchingOptions.map((option, index) => (
                        <Item key={`${option}-${index + 1}`} value={option}>
                            <span>{option}</span>
                        </Item>
                    ))
                ) : (
                    <Item disabled>No matches found</Item>
                )}
            </Menu>
        </Dropdown>
    );
};

