import React, {useEffect, useState} from 'react';
import {Dropdown, Field, Item, Label, Menu, Multiselect} from '@zendeskgarden/react-dropdowns';
import {Tag} from '@zendeskgarden/react-tags';

type Props = {
    label?: string,
    options: any[],
    value: any[],
    valueResolver: (item: any) => string
    onValueSelected: (items: any[]) => void
}
export const MultiSelectField = (props: Props) => {
    const {label, options, valueResolver, onValueSelected, value} = props;

    const [selectedItems, setSelectedItems] = useState<any[]>(value);
    const [inputValue, setInputValue] = useState('');
    const [matchingOptions, setMatchingOptions] = useState<any[]>(options);

    const filterMatchingOptions = (value: string) => {
        const matchedOptions = options.filter(option => {
            return valueResolver(option).trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1;
        });

        setMatchingOptions(matchedOptions);
    }

    useEffect(() => {
        setMatchingOptions(options);
    }, [options])


    useEffect(() => {
        filterMatchingOptions(inputValue);
    }, [inputValue]);

    useEffect(() => {
        onValueSelected(selectedItems);
    }, [selectedItems])

    const renderOptions = () => {
        if (matchingOptions.length === 0) {
            return <Item disabled>No matches found</Item>;
        }

        return matchingOptions.map(option => (
            <Item key={option.id} value={option}>
                <span>{valueResolver(option)}</span>
            </Item>
        ));
    };

    return (
        <Dropdown
            inputValue={inputValue}
            selectedItems={selectedItems}
            onSelect={items => setSelectedItems(items)}
            onInputValueChange={value => setInputValue(value)}
            downshiftProps={{
                defaultHighlightedIndex: 0,
                itemToString: valueResolver
            }}
        >
            <Field>
                {label && (<Label>{label}</Label>)}
                <Multiselect
                    renderItem={({value, removeValue}: any) => (
                        <Tag>
                            <span>{valueResolver(value)}</span>
                            <Tag.Close onClick={() => removeValue()}/>
                        </Tag>
                    )}
                />
            </Field>
            <Menu>{renderOptions()}</Menu>
        </Dropdown>
    );
}
