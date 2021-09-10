import React , { useEffect } from 'react';
import RecipeEdit from './workshop/recipes/RecipeEdit';
import MenuItems from './menu/Items';

import { Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

import { About, Contact, Home } from "./content";
import { RoleSection } from './common';
import  ComingSoon from './content/ComingSoon';
import {  CommunityList, CommunityResponse } from './community';
import { Setting } from './setting';

import { Workshop } from "./workshop";
import {  MyOrders} from "./Orders";
import {  EditPlate } from './workshop/plates';
import { BecomeFoodie, BecomeSupie } from './application';
import { AuthBody  }  from './mobileAuth';

function Body(props) {
  useEffect(() => {
  }, []);

  return (
    <Container fluid={true} className="m-0 p-0">
        <Switch>

          <Route exact path="/workshop">
            <RoleSection roles={['foodie', 'supie']} 
              comp={(<Workshop />)}
                showException={false} />
          </Route>

          <Route exact path="/community">
            <CommunityList/>
            <RoleSection roles={[['foodie', 'supie']]} 
              comp={<CommunityList/>}
              showException={false} />
          </Route>

          <Route  exact path="/orders">
            <MyOrders/>
          </Route>

          <Route  exact path="/auth">
            <AuthBody/>
          </Route>

          <Route  exact path="/editRecipe/:id">
            <RecipeEdit/>
          </Route>
          
          <Route  exact path="/editRecipe/:recipeCode/:id">
            <RecipeEdit/>
          </Route>

          <Route  exact path="/communityResponse/:publishCode">
            <CommunityResponse/>
          </Route>

          <Route  exact path="/editPlate/:recipeCode/:id">
            <EditPlate/>
          </Route>

          <Route exact path="/becomeFoodie">
            {<RoleSection roles={['all']} exroles={['foodie']}
              comp={<BecomeFoodie/>}
              showException={false} />}
          </Route>

          <Route exact path="/becomeSupie">
            {<RoleSection roles={['all']} exroles={['supie']}
              comp={<BecomeSupie/>}
              showException={false} />}
          </Route>
          

          <Route  exact path="/about">
            <About/>
          </Route>
          <Route  exact path="/contact">
            <Contact/>
          </Route>
          <Route  exact path="/">
            <Home/>
          </Route>
          <Route  exact path="/menus">
            <MenuItems/>
          </Route>

          <Route  exact path="/setting">
            <Setting/>
          </Route>

          <Route path="/:title">
            <Container fluid="true" className="p-3 content-body">
              <ComingSoon/>
            </Container>
          </Route>
        </Switch>
    </Container>
   
  );
}

export default Body;
