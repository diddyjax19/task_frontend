import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import PageNotFound from './PageNotFound';
import PrivateRoute from './PrivateRoute';
import CreateProject from './Projects/CreateProject';
import CreateSubTask from './Projects/CreateSubTask';
import CreateTask from './Projects/CreateTask';
import ProjectDetail from './Projects/ProjectDetail';
import ProjectHome from './Projects/ProjectHome';
import TaskDetails from './Projects/TaskDetails';
import TaskLists from './Projects/TaskLists';


const Routing = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={ProjectHome} />
                <PrivateRoute exact path="/project/:id" component={ProjectDetail} />
                <PrivateRoute exact path="/project/:id/task/" component={CreateTask} />
                <PrivateRoute exact path="/project/:id/task/:task_id/subtask/" component={CreateSubTask} />
                {/* <PrivateRoute exact path="/project/:id/task/:task_id" component={TaskDetails} /> */}
                <PrivateRoute exact path="/project/:id/task/:task_id" 
                    component={props => (
                        <TaskDetails
                            {...props}
                        />
                    )}
                />
                <PrivateRoute exact path="/project/:id/tasklist/" component={TaskLists} />
                <PrivateRoute exact path="/create/project" component={CreateProject} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </Router>
    );
};

export default Routing;