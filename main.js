let playerMoney = 100;
let moneyDisplay = document.getElementById("playerOwnedMoney");
let stockCount = 0;
let stocksBought= [];
let bigString = "";
let totalSaleProfit = 0;
window.onload = function () {
  document.getElementById("playerOwnedMoney").innerHTML = playerMoney;
  document.getElementById("playerOwnedStocks").innerHTML = stockCount;
  let dataPoints = [], y = (Math.random() * (50-10) + 10), x = new Date(2016, 0, 02).getTime(), oneDayInms = (24 * 60 * 60 * 1000);
  let stockChart = new CanvasJS.StockChart("stockChartContainer",{
    title:{
      text:"Stock Simulator"
    },
    theme: "light2",
    charts: [{
      data: [{
        xValueType: "dateTime",
        type: "line",
        dataPoints : dataPoints
      }]
    }],
    navigator: {
      slider: {
        minimum: new Date(2016,04,01)
      }
    }
  });

  for(var i = 0; i < 200; i++){
    y += (Math.random() * 10 - 5);
    x += oneDayInms;
    dataPoints.push({x: x, y: y});			
  }
  stockChart.render();

  jQuery("#addDataPoint").on("click", function(e) {
    y += (Math.random() * 10 - 5);
    x += oneDayInms;
    stockChart.options.charts[0].data[0].dataPoints.push({ x: x, y: y });
    stockChart.render();
  });

  jQuery("#updateDataPoint").on("click", function(e) {
    var length = stockChart.options.charts[0].data[0].dataPoints.length;
    y += (Math.random() * 10 - 5);
    stockChart.options.charts[0].data[0].dataPoints[length-1].y = y;
    stockChart.render();
  });
  jQuery("#buyButton").on("click", function(e) {
    if(playerMoney - dataPoints[dataPoints.length-1].y>=0){
      console.log(playerMoney);
      playerMoney= playerMoney - dataPoints[dataPoints.length-1].y;
      console.log(dataPoints[dataPoints.length-1].y);
      console.log(playerMoney);
      y += (Math.random() * 10 - 5);
      x += oneDayInms;
      stockChart.options.charts[0].data[0].dataPoints.push({ x: x, y: y });
      stockChart.render();
      stockCount++;
      stocksBought.push(dataPoints[dataPoints.length-1].y);
      bigString = "";
      for(let i = 0; i < stocksBought.length; i++){
        if(bigString != ""){
          bigString += `, ${stocksBought[i]}`;
        }
        else{
          bigString = `${stocksBought[i]}`;
        }
      }
      document.querySelector('#boughtStockList').innerHTML = `prices of currently owned shares: ${bigString}`
    }
    else{
      console.log("unable to buy, adding new day")
      y += (Math.random() * 10 - 5);
      x += oneDayInms;
      stockChart.options.charts[0].data[0].dataPoints.push({ x: x, y: y });
      stockChart.render();
    }
    document.getElementById("playerOwnedMoney").innerHTML = `$${playerMoney}`;
    document.getElementById("playerOwnedStocks").innerHTML = `${stockCount} shares`;
  });
  jQuery("#sellButton").on("click", function(e) {
    if(stockCount>0){
      console.log(playerMoney);
      playerMoney= playerMoney + dataPoints[dataPoints.length-1].y;
      console.log(dataPoints[dataPoints.length-1].y);
      console.log(playerMoney);
      y += (Math.random() * 10 - 5);
      x += oneDayInms;
      stockChart.options.charts[0].data[0].dataPoints.push({ x: x, y: y });
      stockChart.render();
      stockCount--;
      if(stocksBought.length>0){
        totalSaleProfit += dataPoints[dataPoints.length-1].y - stocksBought[stocksBought.length-1]
        document.querySelector('#profit').innerHTML = `Profit made on last sale: ${dataPoints[dataPoints.length-1].y - stocksBought[stocksBought.length-1]}`;
      }
      document.querySelector('#totalProfit').innerHTML = `Profit made on all sales: ${totalSaleProfit}`;
      stocksBought.splice(stocksBought.length-1, 1);
      bigString = "";
      for(let i = 0; i < stocksBought.length; i++){
        if(bigString != ""){
          bigString += `, ${stocksBought[i]}`;
        }
        else{
          if(stocksBought.length == 0){
            bigString = "No stocks owned"
          }
          else{
            bigString = `${stocksBought[i]}`;
          }
        }
      }
      if(stocksBought.length == 0){
        bigString = "No stocks owned"
      }
      document.querySelector('#boughtStockList').innerHTML = `prices of currently owned shares: ${bigString}`
    }
    else{
      console.log("Unable to sell, insuficient shares")
      y += (Math.random() * 10 - 5);
      x += oneDayInms;
      stockChart.options.charts[0].data[0].dataPoints.push({ x: x, y: y });
      stockChart.render();
    }
    document.getElementById("playerOwnedMoney").innerHTML = `$${playerMoney}`;
    document.getElementById("playerOwnedStocks").innerHTML = `${stockCount} shares`;
  });
  jQuery("#jumpButton").on("click", function(e) {
    for(let i=0; i<31; i++){
      y += (Math.random() * 10 - 5);
      x += oneDayInms;
      stockChart.options.charts[0].data[0].dataPoints.push({ x: x, y: y });
      stockChart.render();
    }
  });
}
 