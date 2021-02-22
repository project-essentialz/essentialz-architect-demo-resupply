import React, { useRef, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Item, Menu, Label, Field, Dropdown, Autocomplete } from '@zendeskgarden/react-dropdowns';
import { Row, Col } from '@zendeskgarden/react-grid';
import { ReactComponent as SearchIcon } from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';


type Props = {
    label: string;
    options: any[]
    disabled?: boolean
    onValueSelected?: (value: string) => void
    value?: string
}
export const AutocompleteInput = (props: Props) => {
    const {label, options, disabled, onValueSelected, value} = props;

    const [selectedItem, setSelectedItem] = useState(value || null);
    const [inputValue, setInputValue] = useState(value || '');
    const [matchingOptions, setMatchingOptions] = useState(options);

    const filterMatchingOptionsRef = useRef(
        debounce((value: string) => {
            const matchedOptions = options.filter(
                option => option.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
            );

            setMatchingOptions(matchedOptions);
        }, 300)
    );

    useEffect(() => {
        if (onValueSelected && selectedItem){
            onValueSelected(selectedItem +"");
        }
    }, [selectedItem])

    useEffect(() => {
        filterMatchingOptionsRef.current(inputValue);
    }, [inputValue]);

    return (
        <Dropdown
            inputValue={inputValue}
            selectedItem={selectedItem}
            onSelect={item => setSelectedItem(item)}
            onInputValueChange={value => setInputValue(value)}
            downshiftProps={{ defaultHighlightedIndex: 0 }}
        >
            <Field>
                <Label>{label}</Label>
                <Autocomplete disabled={disabled} start={<SearchIcon />}>{selectedItem}</Autocomplete>
            </Field>
            <Menu>
                {matchingOptions.length ? (
                    matchingOptions.map(option => (
                        <Item key={option} value={option}>
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

