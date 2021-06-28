var db = require('../database')

//Info restaurant OK
const infoStatisticsController = async (req, res) =>{

    var meanArticlesByOrder = await db.query("SELECT SUM(Orders.price) AS 'meanArticlesByOrder' FROM Orders WHere restaurantId =  "+req.params.restaurantId + " and Orders.status != 'denied' AND Orders.status != 'delivered' AND Orders.status != 'pendingValidation'")
    var meanPriceByOrder = await db.query("SELECT SUM(Orders.price) / COUNT(Orders.id) AS 'meanPricePerOrder'  FROM Orders WHere restaurantId = "+req.params.restaurantId + " and Orders.status != 'denied' AND Orders.status != 'pendingValidation'")
    var article = await db.query("SELECT TOP (3) M.name, SUM(OM.quantity) AS 'num' FROM Order_Menus AS OM INNER JOIN Menus AS M ON OM.menuId = M.id WHERE M.restaurantId = "+req.params.restaurantId + " GROUP BY M.name ORDER BY num DESC")
    var menu = await db.query("SELECT TOP (3) A.name, SUM(OA.quantity) AS 'num' FROM Order_Articles AS OA INNER JOIN Articles AS A ON OA.articleId = A.id WHERE A.restaurantId ="+req.params.restaurantId + " GROUP BY A.name ORDER BY num DESC")

    res.status(200).send({articles:article[0], menus:menu[0], meanArticlesByOrder: meanArticlesByOrder[0][0] ,meanPriceByOrder:meanPriceByOrder[0][0] })
};

module.exports.infoStatisticsController = infoStatisticsController;