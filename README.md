# API Stats 
> 
API returning statistics for a restaurant and on components (2 routes)
**port : 3005**

### GET /statistics/:restaurantId 
> return top 3 menus, top 3 articles, mean price by order and mean articles by order

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **restaurantId**
#### Out
**exit (JSON)** : STRING **accesstoken**, INT **userId**

------------


### GET /components/stats
> return quantity of components downloaded each day

#### In :
**autorization** : BEARER **accesstoken**
**body (JSON)** : /
**params** : /
#### Out
**exit (JSON]**" : { {"date" : "quantity"},{"date" : "quantity"},...}