$(function() {
  // 先截取location.search.substring(4);
  let id = location.search.substring(4);
  // 到数组里面把对应id的数据获取出来
  // 这样做是可以获取到对应的数据的
  // phoneData.forEach(e => {
  //     if (e.pID == id) {
  //         console.log(e);

  //     }
  // })

  // 讲解一个新数组获取指定条件元素的方法
  let target = phoneData.find(e => {
    // 返回条件
    return e.pID == id;
  });

  // 就可以把数据动态的渲染到结构里面
  // 把价格修改
  $(".summary-price em").text(`¥${target.price}`);
  // 修改名字
  $(".sku-name").text(target.name);
  // 修改图片
  $(".preview-img>img").attr("src", target.imgSrc);

  // 点击加入购物车
  let arr = kits.loadData("cartListData");
  console.log(arr);

  $(".addshopcar").on("click", function() {
    // 先获取输入框里面的件数
    let number = $(".choose-number").val();
    // 判断用户输入的数据的合理性
    // 如果输入的是空的，不数数字，数量小于0都是不合理的情况
    if (number.trim().length === 0 || isNaN(number) || parseInt(number) <= 0) {
      alert("商品数量不正确，请重新输入");
      return;
    }
    // 把件数和商品的信息存储到本地数据里面
    // 商品的数据会有很多，所以需要往本地数据里面存储的是一个数组
    // 先从本地数据中读取出一个指定的键-键是自己定义的

    // console.log(arr);
    // 有了数组，可以向里面存储东西
    // 往数组里面存储的数据是一个一个的对象，每个商品都是一个对象
    // 再把数据添加到购物车里面之前，要先判断，该商品是否存在于购物车中，如果存在了，应该是把数量叠加，而不是添加一个新的商品
    // 判断是否已经存在该商品-根据id判断是否已经存在
    let exist = arr.find(e => {
      return e.pID == id;
    });
    // 为了保证数量是数字，需要把数量先转换为数字
    number = parseInt(number);
    // 如果数组中有满足条件的元素，exist就是一个对象，否则是undefined
    if (exist) {
      exist.number += number;
    } else {
      // 需要自己构建数据对象
      let obj = {
        pID: target.pID,
        imgSrc: target.imgSrc,
        name: target.name,
        price: target.price,
        // 件数要从输入框里面获取
        number: number,
        // 保持勾选的状态的属性
        isChecked: true
      };
      // 把数据放到数组里面，然后存到本地数据里面
      arr.push(obj);
    }
    kits.saveData("cartListData", arr);
    // 最后需要跳转到购物车页面
    location.href = "./cart.html";
  });
});
