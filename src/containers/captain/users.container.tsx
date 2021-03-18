import {BaseContainer} from "../base.container";
import {Well} from "@zendeskgarden/react-notifications";
import {TableComponent} from "../../components";
import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../context";
import {field} from "../../utility/field";
import {User} from "../../services/domain";

const options = [
    'Asparagus',
    'Brussel sprouts',
    'Cauliflower',
    'Garlic',
    'Jerusalem artichoke',
    'Kale',
    'Lettuce',
    'Onion',
    'Mushroom',
    'Potato',
    'Radish',
    'Spinach',
    'Tomato',
    'Yam',
    'Zucchini'
];

const fields = [
    field('details.name', 'Name'),
    field('username', 'Username'),
    field('role', 'Role'),
]

type Props = {};
export const UsersContainer = (props: Props) => {
    const {users, actions} = useContext(UserContext)
    const history = useHistory();

    useEffect(() => {
        actions.getUsers();
    }, [])

    const extraButtons: { title: string, onClick: () => void }[] = [
        {
            title: 'Add a user',
            onClick: () => {
                history.push('create-user')
            }
        }
    ]

    const openUserDetails = (user: User) => {
        history.push(`/edit-user/${user.id}`)
    }

    const getAdminUsers = () => {
        return users.filter((user) => user.role === 'captain' || user.role === 'scheduler')
    }
    return (
        <BaseContainer title={"Captain users"} subtitle={"List of all captain users"} extraButtons={extraButtons}>
            <>
                <Well>
                    <TableComponent fields={fields} onRowClicked={openUserDetails} data={getAdminUsers()}/>
                </Well>
            </>

        </BaseContainer>
    )
}