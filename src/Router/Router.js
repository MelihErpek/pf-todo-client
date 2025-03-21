import React from 'react'
import {
    BrowserRouter as RouterApp,
    Switch,
    Route
} from "react-router-dom";

import Login from "../Components/Login"
import AddUser from "../Components/AddUser"
import ToDo from "../Components/ToDo"
import AddToDoItem from "../Components/AddToDoItem"
import Edit from "../Components/EditTodo"

export default function Router() {
    return (
        <div>
            <RouterApp>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/adduser" component={AddUser} />
                    <Route path="/yourtodo" component={ToDo} />
                    <Route path="/addtodoitem" component={AddToDoItem} />
                    <Route path="/edit/:id" component={Edit} />
                    
                </Switch>
            </RouterApp>


        </div>
    )
}
