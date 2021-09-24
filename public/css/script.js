$(function () {

    window.userEventHandler = function (event, data = {}) {
        console.log('event:' + event);
        // console.log('data:');
        // console.log(data);


        if (typeof (VK) != 'undefined') {
            console.log('vk pixel event: ' + event);
            VK.Retargeting.Event(event);
        }
        if (typeof (fbq) != 'undefined') {
            console.log('fb pixel event: ' + event);
            fbq('trackCustom', event);
        }


        for (var i in window) {
            if (new RegExp(/yaCounter/).test(i)) {

                var ya_counter_id = i;
                ya_counter_id = eval(ya_counter_id);
                ya_counter_id.reachGoal(event);
                console.log('ym event: ' + event);
                if (event == 'add' || event == 'order') {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push(data);
                }



            }
        }


        if (typeof (ga) != 'undefined') {
            console.log('ga event: ' + event);

            if (event == 'add') {
                ga("send", {hitType: "event", eventCategory: "Items", eventAction: "Add"});
            }
            if (event == 'order') {
                ga("send", {hitType: "event", eventCategory: "Items", eventAction: "Order"});
            }

        }
        return true;
    }

    window.addshop = (function () {

        var App = {
            version: '0.003 alfa',

            basket: {
                status: 0,
                storage_name: 'addshop_basket',
                getData: function () {
                    var data = JSON.parse(localStorage.getItem(this.storage_name));
                    if (data == null) {
                        return [];
                    } else {
                        return data;
                    }
                },
                getItem: function (index) {
                    var items = this.getData();
                    var return_item = {};

                    $.each(items, function (i, item) {
                        if (i == index) {
                            return_item = item;
                        }
                    });
                    return return_item;
                },
                saveData: function (data) {
                    try {
                        localStorage.setItem(this.storage_name, JSON.stringify(data));
                    } catch (e) {
                        if (e == QUOTA_EXCEEDED_ERR) {
                            alert('Ошибка добавления номера в корзину.');
                        }
                    }
                },

                clean: function () {
                    this.saveData([]);
                },

                countItems: function () {
                    return this.getData().length;
                },

                countTotalSum: function () {
                    var sum = 0;
                    $.each(this.getData(), function (i, el) {
                        sum += el.price * el.quantity;
                    });
                    return sum;
                },
                countTotalSumSale: function () {
                    var sum = 0;
                    $.each(this.getData(), function (i, el) {
                        if (el.discount != 0) {
                            if (el.discount_type == 'percent') {
                                sum += el.price * el.quantity * (1 - el.discount / 100);
                            } else {
                                sum += el.quantity * (el.price - el.discount);
                            }
                            
                        } else if (window.customer_discount) {
                            sum += el.price * el.quantity * (1 - window.customer_discount / 100);
                        } else if (window.promo_discount) {
                            sum += el.price * el.quantity * (1 - window.promo_discount / 100);
                        } else {
                            sum += el.price * el.quantity;
                        }

                    });
                    return sum;
                },
                
                addItem: function (item) {
                    var data = this.getData();
                    var found = false;
                    $.each(data, function (index, i) {
                        if (i.offer_id == item.offer_id) {
                            found++;
                            data[index].quantity = data[index].quantity * 1
                            data[index].quantity += item.quantity * 1;
                        }
                    });
                    if (found == 0) {
                        data.push(item);
                        window.userEventHandler('add', {
                            "ecommerce": {
                                "add": {
                                    "products": [{
                                            "id": item.offer_id,
                                            "name": item.title,
                                            "price": item.price,
                                            "quantity": item.quantity
                                        }]
                                }
                            }
                        });

                    }
                    this.saveData(data);



                },
                replaceItemByIndex: function (item, index) {
                    var data = this.getData();
                    data.splice(index, 1, item);
                    this.saveData(data);
                },
                removeItemByIndex: function (index) {
                    var data = this.getData();
                    data.splice(index, 1);
                    this.saveData(data);
                    $('.pop_up_price').remove();
                },
                numberWithCommas: function (x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                },
                getPromoTitle: function (index) {
                    var items = this.getData();
                    var titile = '';

                    $.each(items, function (i, item) {
                        if (i == index) {
                            titile = item.promo_title;
                        }
                    });
                    return titile;
                },
                renderBasket: function () {
                    var data = this.getData();
                    
                    var total_sum = App.basket.countTotalSum();
                    var grand_total_sale = App.basket.countTotalSumSale();
                    var total_sum_discount = '';
                    var total_sum_discount_html = 0;
                    var print = '';
                    var n = 0;
                    var discount = window.customer_discount;
                    var percent = parseFloat(1 - discount / 100);
                    var new_price_class = '';

                    $.each(data, function (index, item) {
                        var new_price = '';
                        var discount_item_class = '';
                        if (item.discount != 0) {
                            if (item.discount_type == 'percent') {
                                var discount_item = (1 - parseFloat(item.discount) / 100);
                            } else {
                                discount_item = parseFloat(item.discount);
                            }
                        }
                        
                        if (window.promo_discount && item.promo_used) {
                            $('.promo-descr').text('Вы уже использовали купон на скидку!');
                        }
                        if (window.promo_discount && !item.promo_used) {
                            var promodis = window.promo_discount;
                            var promotitle = window.promo_title; 
                            var promopercent = parseFloat(1 - promodis / 100);

                            $('.promo-descr').text('Вы использовали купон ' + promotitle + ' на скидку ' + promodis + '%');
                            
                            item.discount = promodis;
                            item.promo_used = true;
                            item.promo_title = promotitle;
                            item.discount_type = 'percent';
                            App.basket.replaceItemByIndex(item, index);
                        }
                        
                        var sum = parseFloat(item.price * item.quantity).toFixed(2);
                        var price = parseFloat(item.price).toFixed(2);
                        var quantity = parseFloat(item.quantity).toFixed(2);
                        var step = parseFloat(item.step).toFixed(2);
                        var max = parseFloat(item.max).toFixed(2);
                        var sum_discount = '';

                        if (promodis) {
                            new_price_class = 'discount_exist';
                            discount_item_class = 'discount_exist';
                            sum_discount = App.basket.numberWithCommas(parseFloat(item.price * item.quantity * promopercent).toFixed(2)) + ' ' + shop_currency;
                            new_price = (promopercent * price).toFixed(2) + ' ' + shop_currency;
                        } else if ((discount_item != 0 && discount_item < 1) || (discount_item > 0 && item.discount_type != '')) {
                            discount_item_class = 'discount_exist';
                            new_price_class = 'discount_exist';
                            switch (item.discount_type) {
                                case 'percent':
                                    sum_discount = App.basket.numberWithCommas(parseFloat(item.price * item.quantity * discount_item).toFixed(2)) + ' ' + shop_currency;
                                    new_price = (price * discount_item).toFixed(2) + ' ' + shop_currency;
                                    break;
                                    
                                case 'absolute':
                                    sum_discount = App.basket.numberWithCommas(parseFloat((item.price - discount_item) * item.quantity).toFixed(2)) + ' ' + shop_currency;
                                    new_price = (price - discount_item).toFixed(2) + ' ' + shop_currency;
                                    break;
                                    
                                default:
                                    
                                    break;
                            }
                            
                        } else if (discount) {
                            new_price_class = 'discount_exist';
                            discount_item_class = 'discount_exist';
                            sum_discount = App.basket.numberWithCommas(parseFloat(item.price * item.quantity * percent).toFixed(2)) + ' ' + shop_currency;
                            new_price = (price * percent).toFixed(2) + ' ' + shop_currency;
                        } else {
                            sum_discount = '';
                        }
                        n++;
                        var code_html = '';
                        if (item.vendor_code != undefined) {
                            code_html = `Код товара: ${item.vendor_code}`;
                        }
                        var offer_title = '';
                        if (item.offer_title != undefined) {
                            offer_title = `${item.offer_title}`;
                        }
                        print += `
                        <div class="basket_item_wrapp">
                        <div class="item_in_basket_titles">
                                    <div class="title">Наименование товара</div>
                                    <div class="img"></div>
                                    <div class="price">Цена</div>
                                    <div class="quantity">Количество</div>
                                    <div class="total">Стоимость</div>
                                    <div class="remove" data-index="${index}"></div>
                                </div>
                                <div class="item_in_basket">
                                    <div class="image"><img src="${item.image}" /></div>
                                    <div class="title"><a href="${item.link}">${item.title}</a><br><span class="v_code">${code_html}</span> <span class="v_code">${offer_title}</span> </div>
                                    <div class="price"><div>${new_price} </div><span class="${discount_item_class}">${price} ${shop_currency}<span></div>
                                    <div class="quantity">
                                        <div class="count">
                                            <div class="count_minus">-</div>
                                            <input  data-index="${index}" type="text" name="quantity" class="number_input" value="${quantity}" min="${step}"  step="${step}" max="${max}">
                                            <div class="count_plus">+</div>
                                        </div>
                                    </div>
                                    <div class="total"><div class="total_new">${sum_discount}</div><span class="${discount_item_class}">${App.basket.numberWithCommas(sum)} ${shop_currency}</span></div>
                                    <div class="">  </div>
                                </div>
                                </div>`;

                        if (promodis || discount || discount_item) {
                            total_sum_discount = grand_total_sale.toFixed(2);
                        }

                    });

                    if (print == '') {
                        print = 'Нет товаров.';
                    } else {
                        print = `` + print + `<div class="basket_end">                        
                            <div class="left">
                                <div class="promo">
                                <form method="POST" id="apply_promo">
                                    <input name="action" type="hidden" value="apply_promo" />
                                    <input type="text" name="promo" class="promo" value="" placeholder="Введите промокод ..." />
                                    <button class="get_promo">Применить</button>
                                </form>
                                </div>
                            </div>
                            <div class="right">
                                <div class="total_basket_wrapp"><span>Итоговая сумма: </span><span id="basket_total"><span class="${new_price_class}">${App.basket.numberWithCommas(total_sum.toFixed(2))}</span> &nbsp;${App.basket.numberWithCommas(total_sum_discount)}</span> ${shop_currency}</div>
                                <a class="checkout_btn" href="/checkout/">Оформить заказ</a>
                            </div>
                            </div>`;
                    }

                    $('#basket_list').html(print);

                    return true;
                },
                renderfloatBasketList: function () {
                    var data = this.getData();
                    var discount = parseFloat(window.customer_discount);
                    var discount_item_exist = 0;
                    var print = '';
                    var percent = 1 - discount / 100;
                    var n = 0;
                    var grand_total = 0;
                    var grand_total_old = 0;
                    var grand_total_discount = 0;
                    var grand_total_discount_html = '';
                    var price_new_class = '';
                    var grand_quantity = 0;
                    if (discount) {
                        price_new_class = 'discount_exist';
                    }
                    $.each(data, function (index, item) {
                        $('.pop_up_price').remove();
                        
                        if (item.discount != 0) {
                            discount_item_exist = item.discount;
                            if (item.discount_type === 'percent') {
                                var discount_item = 1 - parseFloat(item.discount) / 100;
                            } else {
                                var discount_item = parseFloat(item.discount);
                            }
                        }
                        
                        var price_new_html = '';
                        var quantity = parseFloat(item.quantity).toFixed(1);
                        grand_quantity += parseInt(quantity);
                        var price = parseFloat(item.price).toFixed(2);
                        var price_new = price * percent;
                        
                        if (item.discount_type === 'percent') {
                            var price_new_item = price * discount_item;
                        } else {
                            var price_new_item = price - discount_item;
                        }
                        

                        if (discount_item) {
                            price_new_class = 'discount_exist';
                            price_new_html = `<div class="price_new">Цена со скидкой: ${App.basket.numberWithCommas(price_new_item.toFixed(2))} ${shop_currency}</div>`;
                        } else if (discount) {
                            price_new_class = 'discount_exist';
                            price_new_html = `<div class="price_new">Цена со скидкой: ${App.basket.numberWithCommas(price_new.toFixed(2))}  ${shop_currency}</div>`;
                        }
                        
                        if (item.discount_type === 'percent') {
                            var sum = parseFloat(item.price * item.quantity).toFixed(2);
                        } else {
                            var sum = parseFloat((item.price - item.discount) * item.quantity).toFixed(2);
                        }

                        n++;

                        print += `<div class="item_in_basket">
                                    <a  href="${item.link}">
                                    <div class="image"><img src="${item.image}" /></div>
                                    <div class="descr">
                                        <div class="title">${item.title}</div>
                                        <div class="quantity">Количество: ${quantity}</div>
                                        <div class="price ${price_new_class}">Цена: ${price}  ${shop_currency}</div>
                                        ${price_new_html}
                                    </div>
                                    </a>
                                </div>`;

                        grand_total_old += parseFloat(sum);

                        if (discount_item && discount_item < 1) {
                            if (item.discount_type == 'percent') {
                                sum = sum * discount_item;
                            }
                            
                        } else if (discount) {
                            sum = sum * (1 - discount / 100);
                        } else {
                        }

                        grand_total += parseFloat(sum);

                    });
                    if (window.customer_discount || discount_item_exist) {
                        grand_total_discount_html = grand_total.toFixed(2);
                    } else {
                        grand_total_discount_html = '';

                    }
                    var itogo_html = '';

                    if (grand_total == 0) {
                        itogo_html = `<div class="itogo">
                            <div class="total">Ваша корзина пуста</div>
                        </div>`
                    } else {
                        itogo_html = `<div class="itogo">
                                <div class="total">Итого: <span class="${price_new_class}">${App.basket.numberWithCommas(grand_total_old.toFixed(2))}</span>&nbsp; ${App.basket.numberWithCommas(grand_total_discount_html)} ${shop_currency}</div>
                                <div class="btns"><a href="/basket/">Корзина</a> <a href="/checkout/">Оформить</a></div>
                            </div>`
                    }

                    $('#basket_popup_list').remove();

                    $('body').append(`<div id="basket_popup_list" class="${template_class}">
                                    <div class="close">&#10005;</div>
                                    <div class="items">${print}</div>
                                  ${itogo_html}
                                </div>`);
                    
                    if (template_class == 'kanasi') {
                        $('.basket').append(`<div class="pop_up_price">${parseInt(grand_total)} ${shop_currency}</div>`);
                    } else if (template_class == 'taymyr') {
                        $('.basket .icon_cont').append(`<div class="pop_up_price">${parseInt(grand_total)} ${shop_currency}</div>`);
                        $('.basket a').append(`<div class="pop_up_count">${grand_quantity}</div>`);
                    } else if (template_class == 'simple' || template_class == 'mirror') {
                        $('.basket a').append(`<div class="pop_up_count">${grand_quantity}</div>`);
                    }
                    

                    return true;
                },
                renderPopupBasket: function () {
                    var data = this.getData();
                    var discount = parseFloat(window.customer_discount);
                    var print = '';
                    var n = 0;
                    var grand_total = 0;
                    var discount_item_exist = 0;
                    var grand_total_old = 0;
                    var grand_total_discount_html = '';
                    var price_new_html = '';
                    var price_new_class = '';
                    $.each(data, function (index, item) {
                        
                        if (item.discount != 0) {
                            discount_item_exist = item.discount;
                            if (item.discount_type === 'percent') {
                                var discount_item = 1 - parseFloat(item.discount) / 100;
                            } else if (item.discount_type === 'absolute') {
                                var discount_item = discount_item_exist;
                            }
                        }
                        
                        var price = parseFloat(item.price).toFixed(2)
                        var price_new = price * (1 - discount / 100).toFixed(2);
                        var price_new2 = price_new.toFixed(2);
                        
                        if (item.discount_type === 'percent') {
                            var price_new_item = (price * discount_item).toFixed(2);
                            var sum = parseFloat(item.price * item.quantity).toFixed(2);
                        } else if (item.discount_type === 'absolute') {
                            var price_new_item = (price - discount_item).toFixed(2);
                            var sum = parseFloat((item.price - item.discount) * item.quantity).toFixed(2);
                        }                        
                        
                        var quantity = parseFloat(item.quantity).toFixed(2);

                        if ((discount_item && discount_item < 1) || (discount_item && item.discount_type == 'absolute')) {
                            price_new_class = 'discount_exist';
                            price_new_html = `<div class="price_new">Цена со скидкой: ${App.basket.numberWithCommas(price_new_item)} ${shop_currency}</div>`;
                        } else if (discount) {
                            price_new_class = 'discount_exist';
                            price_new_html = `<div class="price_new">Цена со скидкой: ${price_new2} ${shop_currency}</div>`;
                        } else {
                            price_new_html = '';
                        }

                        n++;

                        print += `<div class="item_in_basket">
                                <a href="${item.link}">
                                    <div class="image"><img src="${item.image}" /></div>
                                    <div class="descr">
                                        <div class="title">${item.title}</div>
                                        <div class="quantity">Количество: ${quantity}</div>
                                        <div class="price">Цена: ${App.basket.numberWithCommas(price)} ${shop_currency}</div>
                                        ${price_new_html}
                                    </div>
                                </a>
                            </div>`;

                        grand_total_old += parseFloat(sum);

                        if (discount_item && discount_item < 1) {
                            sum = sum * discount_item;
                        } else if (discount) {
                            sum = sum * (1 - discount / 100);
                        } else {
                        }

                        grand_total += parseFloat(sum);

                    })
                    if (window.customer_discount || discount_item_exist) {
                        grand_total_discount_html = grand_total.toFixed(2);
                    }

                    $('#basket_popup_wrapper').remove();

                    $('body').addClass('modal');

                    $('body').append(`<div id="basket_popup_wrapper"><div id="basket_popup">
                                    <div class="close">&#10005;</div>
                                    <div class="items">${print}</div>
                                    <div class="itogo">
                                        <div class="total">Итого: <span class="${price_new_class}">${App.basket.numberWithCommas(grand_total_old.toFixed(2))} </span>&nbsp; ${App.basket.numberWithCommas(grand_total_discount_html)} ${shop_currency}</div>
                                        <div class="btns"><a href="/basket/">Корзина</a> <a href="/checkout/">Оформить</a></div>
                                    </div>
                                </div></div>`);

                    return true;

                }
            },

            storage: {
                status: 0,
                storage_name: 'addshop_common',
                getData: function () {
                    var data = JSON.parse(sessionStorage.getItem(this.storage_name));
                    if (data == null) {
                        return {};
                    } else {
                        return data;
                    }
                },
                saveData: function (data) {
                    try {
                        sessionStorage.setItem(this.storage_name, JSON.stringify(data));
                        return true;
                    } catch (e) {
                        if (e == QUOTA_EXCEEDED_ERR) {
                            alert('Ошибка добавления в хранилище.');
                        }
                        return false;
                    }
                },
                clean: function () {
                    this.saveData({});
                    return true;
                },
                setProp: function (prop, val) {
                    var data = this.getData();
                    data[prop] = val;
                    this.saveData(data);
                    return true;

                },
                setProps: function (props) {
                    var data = this.getData();
                    $.extend(data, props);
                    this.saveData(data);
                    return true;

                },
                removeProp: function (prop) {
                    var data = this.getData();
                    delete data[prop];
                    this.saveData(data);
                    return true;
                },
                getProp: function (prop) {
                    var data = this.getData();
                    return data[prop] || '';
                    return true;
                },

            },

            checkDropdownMenu: function () {
                let level2 = $('.menu_collapse_1 .level_1 .level_2');
                let level2_victoria = $('.victoria .new_category .level_2');
                let level2_superior = $('.superior .new_category .level_2');
                level2.before('<div class="chevron_down"><i class="chevron_down_icon"></i></div>')
                level2_victoria.before('<div class="chevron_down"><i class="chevron_down_icon"></i></div>')
                level2_superior.before('<div class="chevron_down"><i class="chevron_down_icon"></i></div>')
            },
            renderItemPicker: function () {
            },
            resizeWindow: function () {
            },
            renderFavorites: function () {
                var items = App.storage.getProp('favorites') || [];
                $('#favorites_list').html('');
                if (items.length == 0) {

                    $('#favorites_list').html('Пока тут пусто.');
                }
                $.each(items, function (i) {

                    $('#favorites_list').append(`<div class="item_favorites"  ><img class="image" src="${items[i].image}" /><a class="title" href="${items[i].link}">${items[i].title}</a><span class="price">${items[i].price} ${shop_currency}</span> <span class="remove" data-index="${i}"><i class="f7-icons">trash</i></span></div>`);
                });
            },
            setCookieSimple: function (view, value) {
                document.cookie = view + "=" + (value || "");
            },

            setCookie: function (name, value, props) {
                props = props || {}
                var exp = props.expires
                if (typeof exp == "number" && exp) {
                    var d = new Date()
                    d.setTime(d.getTime() + exp * 1000)
                    exp = props.expires = d
                }

                if (exp && exp.toUTCString) {
                    props.expires = exp.toUTCString()
                }
                value = encodeURIComponent(value)
                var updatedCookie = name + "=" + value + ';path=/'
                for (var propName in props) {
                    updatedCookie += "; " + propName
                    var propValue = props[propName]
                    if (propValue !== true) {
                        updatedCookie += "=" + propValue
                    }
                }

                document.cookie = updatedCookie

            },

            getCookie: function (name) {
                var matches = document.cookie.match(new RegExp(
                        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                        ))
                return matches ? decodeURIComponent(matches[1]) : undefined
            }
            ,
            getView: function () {
                if (localStorage.getItem("view") !== null) {
                    var view = localStorage.getItem('view');
                    $('body').addClass(view);
                    $('.show_style div').removeClass('active');
                    $('.show_style .' + view).addClass('active');

                }
            },

            itemSC: function (el) {
                var color_id = 0;
                var size_id = 0;
                var el = $(el);
                var galleryTop = new Swiper('.gallery-top', {});        // Еще раз инициализируем слайдер
                
                if (el.hasClass('color')) {
                    var selected_offer = false;
                    $('.size').addClass('disabled');
                    $('.size.active').removeClass('disabled');
                    $('.colors .color.active').removeClass('disabled');
                }
                if ($('.color.active').data('color')) {
                    color_id = $('.color.active').data('color') * 1;
                }
                if ($('.size.active').data('size')) {
                    size_id = $('.size.active').data('size') * 1;
                }
                
                $.each(window.item.offers, function (index, offer) {
                    if (color_id > 0 && size_id == 0) {
                        if (color_id == offer.color_id) {
                            $('.size[data-size="' + offer.size_id + '"]').removeClass('disabled');
                        }
                    }
                    if (size_id > 0 && color_id == 0) {
                        if (size_id == offer.size_id) {
                            $('.color[data-color="' + offer.color_id + '"]').removeClass('disabled');
                        }
                    }
                });
                
                galleryTop.slideTo(getSlideIndexByClass('offer_image_' + color_id), 0, true);
                
                function getSlideIndexByClass(className) {      // Ищем индекс слайда, у которого image.color_id = color.id
                    var index = 0;
                    $.each($('.gallery-top .swiper-wrapper').children(), function (i, item) {
                        if ($(item).hasClass(className)) {
                            index = i;
                            return false;
                        }
                    });
                    return index;
                }

                if (color_id == 0 && size_id == 0) {
                    $('.size').removeClass('disabled');
                    $('.color').removeClass('disabled');
                }

                $.each(window.item.offers, function (index, offer) {
                    if (offer.color_id == color_id && offer.size_id == size_id) {
                        selected_offer = offer;
                    }
                })

                var step = window.item.step || 1;


                if (selected_offer) {
                    // выводим ину по 

                    var max_value = window.item.max_in_order;
                    if (selected_offer.quantity * 1 > 0 && selected_offer.infinitely * 1 == 0) {
                        // возможен заказ в рамках quantity
                        $('.item_preview .availability').text('В наличии');
                        max_value = selected_offer.quantity;
                    } else if (selected_offer.infinitely == 1) {
                        // возможен заказ в рамках max_in_order
                        $('.item_preview .availability').text('В наличии');

                    } else if (selected_offer.quantity * 1 <= 0 && window.item.under_the_order * 1 == 1) {
                        $('.item_preview .availability').text('Под заказ');
                        // возможен заказ в рамках max_in_order под заказ

                    } else {
                        // нету в наличии нельзя заказывать
                        $('.item_preview .availability').text('Нет в наличии');
                        $('.item_price').html('Извините, но данный товар закончился на складе.');
                        return;
                    }
                    let new_price = '';
                    let new_price_class = '';
                    let new_total_price = '';
                    let price_discount = 0;
                    let item_discount = 0;
                    
                    let one_buy_click_button = '';
                    if (window.one_click_buy) {
                        one_buy_click_button = `<button class="oneclickbuy"><i class="f7-icons">arrowshape_turn_up_left_2</i>Купить в 1 клик</button>`;
                    }
                    

                    if (window.item_discount) {
                        new_price_class = 'discount_exist';
                        window.discount_type === 'absolute' ? price_discount = selected_offer.price - window.item_discount : price_discount = selected_offer.price * (1 - window.item_discount / 100).toFixed(2);
                        new_price = `<span class="one_price">${price_discount.toFixed(2)} ${shop_currency}</span>`;
                        new_total_price = `<span class="total_new">${price_discount.toFixed(2)} ${shop_currency}</span>`;
                    } else if (window.customer_discount) {
                        new_price_class = 'discount_exist';
                        price_discount = selected_offer.price * (1 - window.customer_discount / 100).toFixed(2);
                        new_price = `<span class="one_price">${price_discount.toFixed(2)} ${shop_currency}</span>`;
                        new_total_price = `<span class="total_new">${price_discount.toFixed(2)} ${shop_currency}</span>`;
                    }
                    
                    switch (template_class) {
                        case 'simple':
                            $('.item_price').html(`
                                <form method="GET" action="/basket/add/">
                                    <input type="hidden" name="step" value="${step}" />
                                    <input type="hidden" name="max" value="${max_value}" />
                                    <input type="hidden" name="price" value="${selected_offer.price}" />
                                    <input type="hidden" name="offer_id" value="${selected_offer.id}" />
                                    <div class="count">
                                        <div class="count_minus">-</div>
                                        <input type="text" name="quantity" class="number_input" value="1" min="${step}" step="${step}" max="${max_value}" />
                                        <div class="count_plus">+</div>
                                    </div>
                                    <div class="total_price">${App.basket.numberWithCommas(new_total_price)}<span class="total ${new_price_class}"> ${App.basket.numberWithCommas(selected_offer.price)}  ${shop_currency}</span></div>
                                    <button>В корзину</button>
                                    ${one_buy_click_button}
                                </form>`);
                            $('.simple_price').prepend(`<div class="total_price">${App.basket.numberWithCommas(new_total_price)}<span class="total ${new_price_class}"> ${App.basket.numberWithCommas(selected_offer.price)}  ${shop_currency}</span></div>`);
                            
                            break;
                        
                        case 'tahoe':
                            $('.item_price').html(`
                                <form method="GET" action="/basket/add/">
                                    <input type="hidden" name="step" value="${step}" />
                                    <input type="hidden" name="max" value="${max_value}" />
                                    <input type="hidden" name="price" value="${selected_offer.price}" />
                                    <input type="hidden" name="offer_id" value="${selected_offer.id}" />
                                    <div class="count">
                                        <div class="count_minus">-</div>
                                        <input type="text" name="quantity" class="number_input" value="1" min="${step}" step="${step}" max="${max_value}" />
                                        <div class="count_plus">+</div>
                                    </div>
                                    <div class="total_price">${App.basket.numberWithCommas(new_total_price)}<span class="total ${new_price_class}"> ${App.basket.numberWithCommas(selected_offer.price)}  ${shop_currency}</span></div>
                                    <button>В корзину</button>
                                    ${one_buy_click_button}
                                </form>`);
                            break;
                            
                        case 'taymyr':
                            $('.item_price').html(`
                                <form method="GET" action="/basket/add/">
                                    <input type="hidden" name="step" value="${step}" />
                                    <input type="hidden" name="max" value="${max_value}" />
                                    <input type="hidden" name="price" value="${selected_offer.price}" />
                                    <input type="hidden" name="offer_id" value="${selected_offer.id}" />
                                    <div class="count">
                                        <div class="count_minus">-</div>
                                        <input type="text" name="quantity" class="number_input" value="1" min="${step}" step="${step}" max="${max_value}" />
                                        <div class="count_plus">+</div>
                                    </div>
                                    <div class="total_price">${App.basket.numberWithCommas(new_total_price)}<span class="total ${new_price_class}"> ${App.basket.numberWithCommas(selected_offer.price)}  ${shop_currency}</span></div>
                                    <button class="item_add_to_cart">В корзину</button>
                                    ${one_buy_click_button}
                                </form>`);
                            break;
                            
                        default:
                            $('.item_price').html(`
                                <form method="GET" action="/basket/add/">
                                    <input type="hidden" name="step" value="${step}" />
                                    <input type="hidden" name="max" value="${max_value}" />
                                    <input type="hidden" name="price" value="${selected_offer.price}" />
                                    <input type="hidden" name="offer_id" value="${selected_offer.id}" />
                                    <div class="count">
                                    <span class="details_title">Количество: </span>
                                    <div class="count_minus">-</div>
                                    <input type="text" name="quantity" class="number_input" value="1" min="${step}" step="${step}" max="${max_value}"  />
                                    <div class="count_plus">+</div>
                                </div>
                                    <button class="add_to_basket"><i class="f7-icons">cart_fill</i>В корзину</button>
                                    ${one_buy_click_button}
                                </form>
                                <div class="price_one_wrapp">
                                    <span class="details_title ">Цена:</span>${App.basket.numberWithCommas(new_price)}<span class="one_price ${App.basket.numberWithCommas(new_price_class)}">${App.basket.numberWithCommas(selected_offer.price)} ${shop_currency}</span> 
                                </div>
                                <div class="total_price"><span class="details_title">Общая сумма.:</span>${App.basket.numberWithCommas(new_total_price)}<span class="total ${new_price_class}"> ${App.basket.numberWithCommas(selected_offer.price)}  ${shop_currency}</span></div>`);
                            break;
                    }

                    $('body').on('click', '.oneclickbuy', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        
                        var quantity_val = $('.item_preview').find('[name="quantity"]').eq(0).val();
                        var quantity_step = $('.item_preview').find('[name="quantity"]').attr('step');
                        
                        if (quantity_val == 0 || isNaN(quantity_val)) {
                            if ($('.item_preview .count .invalid').length == 0) {
                                $('.item_preview .count').append('<span class="invalid" style="color:red;  font-size: 12px;">Некорректное значение поля</span>');
                            } else {
                                $('.item_preview .count .invalid').text('Некорректное значение поля');
                            }
                            return;
                        } else {
                            $('.item_preview .invalid').remove();
                        }
                        if (quantity_step == 1) {
                            quantity_val = parseInt(quantity_val);
                        }
                        
                        var offer_title = '';
                        if ($('.item_preview .size.active').eq(0).text() != undefined) {
                            offer_title = $('.item_preview .size.active').eq(0).text();
                        }
                        if ($('.item_preview .color.active .color_view').eq(0).attr('title') != undefined) {
                            offer_title += ' ' + $('.item_preview .color.active .color_view').eq(0).attr('title');
                        }
                        
                        var item = {
                            title: $('.item_title').eq(0).text(),
                            vendor_code: $('.vendor_or_id').eq(0).text(),
                            offer_title: offer_title,
                            image: $('.extra_image').find('img').eq(0).attr('src'),
                            offer_id: $('.item_preview').find('[name="offer_id"]').eq(0).val(),
                            quantity: quantity_val,
                            price: $('.item_preview').find('[name="price"]').eq(0).val(),
                            max: $('.item_preview').find('[name="max"]').eq(0).val(),
                            step: $('.item_preview').find('[name="step"]').eq(0).val(),
                            discount: window.item_discount,
                            discount_type: $('.item_price').data('discount-type'),
                            one_click_buy: true,
                            link: window.location.pathname
                        };
                        
                        App.basket.addItem(item);
                        window.location.href = "/checkout/";
                    });

                } else {
                    // выводим инфу по (заказать нельзя) 
                    if (color_id == 0 || size_id == 0) {
                        $('.item_price').html(`Выберите цвет / размер`);
                    }
                }
            },
            
            // String in string search function
            stringFind: function (needle, searchable) {
                if (needle.search(searchable) != -1) {
                    return true;
                } else {
                    return false;
                }
            },

            eventListener: function () {

                App.checkDropdownMenu();

                if ($('body').hasClass('simple') || $('body').hasClass('victoria') || $('body').hasClass('superior') || $('body').hasClass('horseshoe') || $('body').hasClass('champlain') || $('body').hasClass('tahoe') || $('body').hasClass('taymyr')) {
                    console.log(1);
                    setTimeout(function () {
                        menuTooglerPopup();
                    }, 300)
                } else if ($(window).width() > 1000) {
                    console.log(2);
                    setTimeout(function () {
                        menuTooglerPopup();
                    }, 300)

                }


                function menuTooglerPopup() {
                    let button = document.getElementById('menu-toggler');
                    if ($(button).length) {
                        button.addEventListener('click', function () {
                            $('.menu_p').toggleClass('menu_open');
                        });
                    }
                    window.addEventListener('resize', debounce(restart, 450));

                    function moveForward() {
                        let listElements = Array.from(document.querySelectorAll('#menu_list .li')),
                                invisibleElements = getInvisible(listElements),
                                menuList = document.getElementById('menu_popup');

                        invisibleElements.forEach(function (item) {
                            menuList.appendChild(item);
                        });
                        console.log(invisibleElements);
                        if (invisibleElements.length == 0) {
                            $('#menu-toggler').hide();
                        } else {
                            $('#menu-toggler').show();
                        }

                    }
                    moveForward();
                    function moveBackward() {
                        let menuListElements = Array.from(document.querySelectorAll('#menu_popup .li')),
                                list = document.getElementById('menu_list');

                        menuListElements.forEach(function (item) {
                            list.appendChild(item);
                        });
                    }
                    function restart() {
                        moveBackward();
                        moveForward();
                    }

                    function getInvisible(listElements) {
                        let list = document.getElementById('menu_list');
                        var item_width = 0;
                        let invisible = listElements.filter(function (item) {
                            item_width = item_width + item.getBoundingClientRect().width;
                            if (item_width + 50 > list.offsetWidth) {
                                return item;
                            }
                        });
                        console.log(list.offsetWidth);

                        return invisible;
                    }
                    function debounce(func, wait, immediate) {
                        console.log('debonce');
                        var timeout;
                        return function () {
                            var context = this,
                                    args = arguments;
                            var later = function () {
                                timeout = null;
                                if (!immediate)
                                    func.apply(context, args);
                            };
                            var callNow = immediate && !timeout;
                            clearTimeout(timeout);
                            timeout = setTimeout(later, wait);
                            if (callNow)
                                func.apply(context, args);
                        };
                    }
                    ;


                }

                // App.getView();
                // страница товара
                if (typeof (window.item) !== 'undefined' || $('.items_table').length) {


                    if (typeof (window.item) !== 'undefined') {
                        App.itemSC();

                        // страница товара
                        //App.renderItemPicker();
                        var sizes_counter = 0;
                        var colors_counter = 0;
                        $.each(window.item.offers, function (index, offer) {
                            if (offer.size_id * 1 != 0) {
                                sizes_counter++;
                            }
                            if (offer.color_id * 1 != 0) {
                                colors_counter++;
                            }
                        })
                        if (colors_counter == 0) {
                            $('.colors_wrapper').hide();
                        } else {
                            setTimeout(function () {
                                $('.colors .color:first-child').click();
                            }, 300)
                        }
                        if (sizes_counter == 0) {
                            $('.sizes_wrapper').hide();
                        } else {
                            setTimeout(function () {
                                if (!$('.sizes .size:first-child').hasClass('disabled')) {
                                    $('.sizes .size:first-child').click();
                                } else {
                                    $('.sizes .size').click();
                                }
                            }, 150)
                        }
                        $('body').on('click', '.colors', function (e) {

                            $(this).toggleClass('active');
                        })

                        $('body').on('click', '.color', function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            var size_clicked = $('.size.active').data('size');
                            $('.size').removeClass('active');
                            setTimeout(function () {
                                if (!$('.sizes .size[data-size="' + size_clicked + '"]').hasClass('disabled')) {
                                    $('.sizes .size[data-size="' + size_clicked + '"]').click();
                                } else {
                                    $('.sizes .size').click();
                                }
                            }, 100)
                            if ($(this).hasClass('disabled'))
                                return;
                            if ($(this).hasClass('active')) {
                                // $(this).removeClass('active');
                            } else {
                                $('.color').removeClass('active');
                                $(this).addClass('active');
                            }
                            App.itemSC(this);
                        })

                        // $('body').on('click', '.extra_image img', function(){
                        //     var src = $(this).attr('src');
                        //     src = src.replace(new RegExp("100x100",'g'), '440x0');
                        //     $('.item_preview .image img').attr('src', src);
                        // })

                        $('body').on('click', '.sizes', function (e) {
                            if (!$(this).hasClass('active')) {
                                // $(this).find('.size').removeClass('active disabled');
                            }
                            $(this).toggleClass('active');
                        });

                        $('body').on('click', '.item_tab_controlls .tab', function () {
                            var data_tab = $(this).data('tabControll');
                            $('.item_tab_controlls .tab').removeClass('active');
                            $(this).addClass('active');
                            $('.tab_content').removeClass('active');
                            $('.tab_content').each(function () {
                                var data_content = $(this).data('tabContent');
                                if (data_content == data_tab) {
                                    $(this).addClass('active');
                                }
                            })
                        })
                        $('body').on('click', '.size', function () {
                            if ($(this).hasClass('disabled')) {
                                // $('.size').removeClass('disabled active');
                                // $('.color').removeClass('disabled active');
                                return;
                            }
                            if ($(this).hasClass('active')) {
                                // $(this).removeClass('active');
                            } else {
                                $('.size').removeClass('active');
                                $(this).addClass('active');
                            }
                            App.itemSC(this);
                        });

                    }

                    $('body').on('submit', 'form[action="/basket/add/"]', function (e) {
                        e.preventDefault();
                        if ($('.item_price').hasClass('disable')) {
                            return;
                        }
                        //var data = new FormData($(this)[0]);
                        var quantity_val = $(this).find('[name="quantity"]').eq(0).val();
                        var quantity_step = $(this).find('[name="quantity"]').attr('step');


                        if (quantity_val == 0 || isNaN(quantity_val)) {
                            if ($('.item_preview .count .invalid').length == 0) {
                                $('.item_preview .count').append('<span class="invalid" style="color:red;  font-size: 12px;">Некорректное значение поля</span>');
                            } else {
                                $('.item_preview .count .invalid').text('Некорректное значение поля');
                            }
                            return;
                        } else {
                            $('.item_preview .invalid').remove();
                        }
                        if (quantity_step == 1) {
                            quantity_val = parseInt(quantity_val);
                        }
                       
                        var item_discount = $(this).parents('.item').find('.item_price').data('discount') || $('.item_price').data('discount');
                        if (item_discount == '0.00') {
                            item_discount = 0;
                        }

                        var offer_title = '';
                        if ($('.item_preview .size.active').eq(0).text() != undefined) {
                            offer_title = $('.item_preview .size.active').eq(0).text();
                        }
                        if ($('.item_preview .color.active .color_view').eq(0).attr('title') != undefined) {
                            offer_title += ' ' + $('.item_preview .color.active .color_view').eq(0).attr('title');
                        }


                        var item = {
                            title: $('h1').eq(0).text(),
                            vendor_code: $('.item_preview .vendor_or_id').eq(0).text(),
                            offer_title: offer_title,
                            image: $('.extra_image').find('img').eq(0).attr('src'),
                            offer_id: $(this).find('[name="offer_id"]').eq(0).val(),
                            quantity: quantity_val,
                            price: $(this).find('[name="price"]').eq(0).val(),
                            max: $(this).find('[name="max"]').eq(0).val(),
                            step: $(this).find('[name="step"]').eq(0).val(),
                            discount: item_discount,
                            discount_type: $('.item_price').data('discount-type'),
                            promo_used: false,
                            link: window.location.pathname
                        };

                        // fix for basket add btn
                        if (item.link.includes('categories')) {
                            item.title = $(this).parents('.item').find('.descr').text();
                            item.vendor_code = $(this).parents('.item').data('code');
                            item.image = $(this).parents('.item').find('img').eq(0).attr('src');
                            item.link = $(this).parents('.item').find('.descr a').attr('href');
                            item.discount = $(this).parents('.item').data('discount');
                            item.discount_type = $(this).parents('.item').data('discount-type');
                            if ($(this).parents('.item').data('size') && $(this).parents('.item').data('size') !== 0) {
                                item.offer_title = $(this).parents('.item').data('size');
                            }
                            if ($(this).parents('.item').data('color') && $(this).parents('.item').data('color') !== 0) {
                                item.offer_title += ' ' + $(this).parents('.item').data('color');
                            }
                        }

                        console.log(item);
                        App.basket.addItem(item);
                        App.basket.renderfloatBasketList();
                        App.basket.renderPopupBasket();
                        // },10)
                    });

                }
    
                
                $('body').on('click', '.show_style div', function (e) {
                    $('.show_style div').removeClass('active');
                    $(this).addClass('active');
                    $('.items').removeClass('list grid');
                    var data_id = $(this).data('id');
                    // localStorage.setItem('view', data_id);
                    $('.items').addClass(data_id);
                    App.setCookieSimple('view', data_id);

                });


                $('.main').click(function () {
                    $('.search_form').removeClass('active');
                    $('body').removeClass('search_opened');
                    $('.slogan').removeClass('hide');
                });
                $('body').click(function (event) {
                    if ($(event.target).closest('.icon').length === 0) {
                        $('.links').removeClass('active');
                    }
                    if ($(event.target).closest('.filter_bar').length === 0) {
                        $('.filter_bar').removeClass('active');
                    }
                    if ($(event.target).closest('.user_mob').length === 0 && !$(event.target).hasClass('logout')) {
                        $('.logout').removeClass('active');
                    }
                    if ($(event.target).closest('.menu').length === 0) {
                        $('.menu_p').removeClass('menu_open');
                    }
                    if ($(event.target).closest('.new_category').length === 0 && !$(event.target).closest('.catalog_title')) {
                        $('.new_category').removeClass('active');
                        $('body').removeClass('menu_active');
                    }
                    if ($(event.target).closest('.catalog_title').length === 0 && !$(event.target).closest('.categories')) {
                        $('.categories').removeClass('active');
                    }
                    if ($(event.target).closest('.search_open').length === 0) {
                        $('.search_open').removeClass('active');
                    }
                });
                
                
                /*  Всякие скрипты с фишками тем, где универсальные методы сразу для всего не подойдут */
                switch (template_class) {
                    case 'simple':                        
                        // В меню добавлен новый пункт не через TWIG, следственно текущая страница сама не определится
                        // Через JS определяем текущую страницу и уже от этого танцуем <a> или <span>
                        if (App.stringFind(window.location.pathname, /manufacturers/)) {
                            $('.top-right-bottom-left .level_1').prepend('<li class="li light"><span class="current">Бренды</span></li>');
                        } else {
                            $('.top-right-bottom-left .level_1').prepend('<li class="li light"><a href="/manufacturers/">Бренды</a></li>');
                        }
                        
                        $('.user_profile').on('click', '.user_email', function() {
                            $('.user_mob').toggleClass('active');
                        });

                        break;
                        
                    case 'mirror':
                        
                        $('body').on('click', '.search_open', function() {
                            $('header .logo_wrapper').addClass('hidden');
                        });
                        $('body').on('click', '.main', function() {
                            $('header .logo_wrapper').removeClass('hidden');
                        });
                        
                        $('body').on('click', '.menu_opener', function() {
                            $('.menu-wrapper').addClass('show');
                            $('.menu-wrapper-overlay').addClass('show');
                        });
                        $('body').on('click', '.menu-close', function() {
                            $('.menu-wrapper').removeClass('show');
                            $('.menu-wrapper-overlay').removeClass('show');
                        });
                        $('body').on('click', '.menu-wrapper-overlay', function() {
                            $('.menu-wrapper').removeClass('show');
                            $('.menu-wrapper-overlay').removeClass('show');
                        });
                        
                        $('body').on('click', '.user-profile', function() {
                            $('.user-popup').toggleClass('active');
                        });
                        
                        
                        break;
                    
                    case 'mystic':
                        $('.search_open').click(function (e) {
                            e.stopPropagation();
                            $('.search_form ').addClass('active');
                            $('#search').focus();
                        });
                        $('.search_form').click(function (e) {
                            e.stopPropagation();
                        });
                        $('body').click(function () {
                            $('.search_form ').removeClass('active');
                        });

                        $('.target-burger, .close_mobile_menu').click(function (e) {
                            e.preventDefault();
                            $('body').toggleClass('menu_open');
                            $('html').toggleClass('popup_open');
                        });
                        break;
                        
                    case 'kanasi':      // А может да?
                    case 'tahoe':
                        $('.search_open').click(function (e) {
                            e.stopPropagation();
                            $('.search_form ').addClass('active');
                            $('.search_open ').addClass('hide');
                            $('#search').focus();
                        });
                        $('.search_form').click(function (e) {
                            e.stopPropagation();
                        });
                        $('body').click(function () {
                        $('.search_form ').removeClass('active');
                            $('.search_open ').removeClass('hide');
                        });
                        break;
                        
                    case 'ladoga':
                        var items = $('.level_1').children();
                        for (i = 0; i < $('.level_1').children().length; i++) {
                            if (items[i].children.length > 1) {
                                $(items[i]).append('<i class="f7-icons">chevron_compact_right</i>');
                            }
                        }
                        var items2 = $('.level_2').children();
                        for (i = 0; i < $('.level_2').children().length; i++) {
                            if (items2[i].children.length > 1) {
                                $(items2[i]).append('<i class="f7-icons">chevron_compact_right</i>');
                            }
                        }
                        break;
                        
                    default:
                        
                        break;
                }

                
                // customers cities functions
                $('body').on('click', '.customer-city', function () {
                    $('.popup-city').toggleClass('active');
                    $('.popup-cities').removeClass('active');
                });
                $('.popup-city').on('click', '.btn-primary', function () {
                    $('.popup-city').removeClass('active');
                });
                $('.popup-city').on('click', '.btn-secondary', function () {
                    $('.popup-city').removeClass('active');
                    $('.popup-cities').addClass('active');
                });
                $('.popup-cities').on('click', 'li', function() {
                    var data_city = $(this).data('name');
                    App.setCookie('city', data_city, 0, '/');
                    $('.popup-cities').removeClass('active');
                    location.reload();
                });

                
                //Спойлер для свойств товара на странице карточки
                $('.inner_more').click(function () {
                    $('.inner_prop').toggleClass('dropdown');
                });

                $('.horseshoe .catalog_title').click(function (e) {
                    $('.categories').toggleClass('active');
                });
                $('body').on('click', '.menu .close', function (e) {
                    $('.menu').removeClass('active');
                });
                $('body').on('click', '.mob_menu', function (e) {
                    $('.menu').addClass('active');
                });
                $('body').on('click', '.catalog_title.mob', function (e) {
                    $('.sidebar').toggleClass('active');
                });
                $('.simple .catalog_title').click(function (e) {
                    $('.simple .categories').toggleClass('active');
                });
                
                
                $('body').on('click', '.main .filter_bar .title', function (e) {
                    $(this).parent().toggleClass('active');
                    $('.filter_bar .price_range .f_title').click();
                });
                $('body').on('click', '.filter_bar .f_title', function (e) {
                    $(this).toggleClass('active');
                    $(this).next().toggleClass('active');
                });
                

                $('.search_form input').on('click', function (e) {
                    $(this).parent().parent().addClass('active');
                });

                $('.new_category li').hover(function (e) {
                    if (window.innerWidth >= 1000) {
                        let level2 = $(this).children('.level_2');
                        if (level2) {
                            $(this).addClass('active');
                        }
                    }
                }, function () {
                    if (window.innerWidth >= 1000) {
                        $(this).removeClass('active');
                    }
                });
                window.onscroll = function () {
                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrolled >= 150) {
                        $('.victoria header').addClass('fixed');
                        $('.kanasi .basket').addClass('hide');
                    } else {
                        $('.victoria header').removeClass('fixed');
                        $('.kanasi .basket').removeClass('hide');
                    }
                };
                
                // Mobile menu
                if (template_class === 'simple' || template_class === 'baikal' || template_class === 'victoria' || template_class === 'isabelle' || template_class === 'louise' || template_class === 'kanasi' || template_class === 'champlain' || template_class === 'tahoe' || template_class === 'superior' || template_class === 'ladoga' || template_class === 'michigan' || template_class === 'emerald' || template_class === 'taymyr') {
                    $('.menu_popup_mob .close').click(function (e) {
                        $('.menu_popup_mob').toggleClass('active');
                    });
                    $('.mob_menu').click(function (e) {
                        $('.menu_popup_mob').toggleClass('active');
                    });
                }
                
                $('.baikal .catalog_title').click(function (e) {
                    $('.categories').toggleClass('active');
                });
                $('.superior .new_category i').click(function (e) {
                    $('.superior .new_category').toggleClass('active');
                });

                $('.michigan .catalog_title').click(function (e) {
                    $('.michigan .categories').toggleClass('active');
                });
                $('.emerald .catalog_title').click(function (e) {
                    $('.emerald .categories').toggleClass('active');
                });

                $('.superior .catalog_title').click(function (e) {
                    $('.superior .new_category').toggleClass('active');
                    // $('.superior').toggleClass('menu_active');
                });
                $('.victoria .catalog_title').click(function (e) {
                    $('.victoria .new_category').toggleClass('active');
                });
                
                $('.new_category .chevron_down').click(function (e) {
                    if (window.innerWidth < 1000) {
                        $('.new_category li').removeClass('active');
                        let level2 = $(this).siblings('.level_2');
                        if (level2) {
                            $(this).parent().addClass('active');
                        }
                    }
                });

                $('body').on('click', '.search_open', function (e) {
                    console.log('touchend');
                    $(this).addClass('active');
                    $('.search_form').addClass('active');
                    $('.slogan').addClass('hide');
                    $('.search_form input').focus();
                    $('body').addClass('search_opened');
                });



                $('body').on('click', '.user_mob, .icon', function (e) {
                    $(this).next().addClass('active');
                });
                $('body').on('click', '.login_or_reg, .icon', function (e) {
                    $(this).next().addClass('active');
                });
                $('body').on('click', '.catalog_title', function (e) {
                    $('.nositebar .categories').toggleClass('active');
                });

                $('select').each(function () {
                    var $this = $(this),
                            numberOfOptions = $(this).children('option').length;
                    $this.addClass('s-hidden');
                    $this.wrap('<div class="select"></div>');
                    $this.after('<div class="styledSelect"></div>');
                    var $styledSelect = $this.next('div.styledSelect');
                    $styledSelect.text($this.children('option:selected').eq(0).text() || $this.children('option').eq(0).text());
                    var $list = $('<ul />', {
                        'class': 'options'
                    }).insertAfter($styledSelect);
                    for (var i = 0; i < numberOfOptions; i++) {
                        $('<li />', {
                            text: $this.children('option').eq(i).text(),
                            rel: $this.children('option').eq(i).val()
                        }).appendTo($list);
                    }
                    var $listItems = $list.children('li');
                    $styledSelect.click(function (e) {
                        e.stopPropagation();
                        $('div.styledSelect.active').each(function () {
                            $(this).removeClass('active').next('ul.options').hide();
                        });
                        $(this).toggleClass('active').next('ul.options').toggle();
                    });
                    $listItems.click(function (e) {
                        e.stopPropagation();
                        $styledSelect.text($(this).text()).removeClass('active');
                        $this.val($(this).attr('rel'));
                        $list.hide();
                        if ($this.parents('.sort_show').length) {
                            $('.filter_items').submit();
                        }
                    });
                    $(document).click(function () {
                        $styledSelect.removeClass('active');
                        $list.hide();
                    });
                });

                if (window.location.pathname == '/basket/') {

                    App.basket.renderBasket();
                    
                    $('#basket_list').on('click', '.basket_item_wrapp .remove', function () {
                        var index = $(this).data('index');
                        App.basket.removeItemByIndex(index);
                        App.basket.renderBasket();
                        App.basket.renderfloatBasketList();
                    });

                    $('#basket_list').on('click', '.count_minus, .count_plus', function () {
                        var $input = $(this).parent().find('input[name="quantity"]');
                        var max = $input.attr('max') * 1;
                        var step = $input.attr('step') * 1;
                        var value = $input.val() * 1;

                        var min = $input.attr('min') * 1;


                        if (value > 0) {
                            $('.count .invalid').remove();
                        }
                        if ($(this).hasClass('count_minus')) {
                            value -= step;
                        } else {
                            value += step;

                        }
                        if (value <= 0) {
                            value = 0
                        }


                        if (value < min) {
                            value = min;
                        }

                        if (value >= max) {
                            value = max;
                        }

                        var index = $input.data('index');
                        var item = App.basket.getItem(index);
                        item.quantity = value;
                        App.basket.replaceItemByIndex(item, index);

                        App.basket.renderBasket();
                        App.basket.renderfloatBasketList();

                    });
                }

//                $(window).on('resize', function (event) {
//
//                });

                if (window.location.pathname == '/favorites/') {
                    App.renderFavorites();
                    $('#favorites_list').on('click', '.remove', function () {
                        var index = $(this).data('index');
                        var items = App.storage.getProp('favorites') || [];
                        items.splice(index, 1);
                        App.storage.setProp('favorites', items);
                        App.renderFavorites();
                    });
                }

                App.basket.renderfloatBasketList();
                $('body').on('mouseleave', '#basket_popup_list', function (e) {
                    $(this).hide();
                })


                $('body').on('mouseover', '.basket a', function (e) {
                    e.preventDefault();
                    if ($(window).width() > 1200) {
                        $('#basket_popup_list').show();
                    }
                })


                $('body').on('click', '#basket_popup_list .close', function (e) {
                    $('#basket_popup_list').hide();
                })
                $('body').on('click', '#basket_popup .close', function (e) {
                    $('body').removeClass('modal')
                    $('#basket_popup_wrapper').remove();
                })



                $('body').on('change', '#checkout_form [name="customer_type"]', function (e) {
                    if ($(this).data("type") == "ur") {
                        $('#checkout_form .ul_extra_fields').show();
                        $('.ul_extra_fields').find('input[data-required]').attr('required', 'required');

                    } else {
                        $('#checkout_form .ul_extra_fields').hide();
                        $('.ul_extra_fields').find('input[data-required]').removeAttr('required', 'required');
                    }

                })
                $('body').on('click', '.menu_collapse_1 .chevron_down', function (e) {
                    $(this).toggleClass('active');
                    $(this).next().toggleClass('active');
                })

                $('body').on('change', '.item_price .number_input', function () {
                    var $price = $(this).parent().parent().find('input[name="price"]');
                    var price = $price.val() * 1;
                    var discount_price = $price.val() * (1 - window.customer_discount / 100);
                    var discount_item_price = $price.val() * (1 - window.item_discount / 100);
                    var value = $(this).val() * 1;
                    $('.total_price .total').html(App.basket.numberWithCommas((price * value).toFixed(2)) + ' ' + shop_currency);
                    if (window.customer_discount) {
                        $('.total_price .total_new').html(App.basket.numberWithCommas((discount_price * value).toFixed(2)) + ' ' + shop_currency);
                    } else if (window.item_discount) {
                        $('.total_price .total_new').html(App.basket.numberWithCommas((discount_item_price * value).toFixed(2)) + ' ' + shop_currency);
                    }
                })

                $('body').on('click', '.item_price .count_minus, .item_price .count_plus, .item .count_minus, .item .count_plus', function () {
                    // console.log('+/-');
                    var $input = $(this).parent().find('input[name="quantity"]');
                    var $price = $(this).parent().parent().find('input[name="price"]');
                    var max = $input.attr('max') * 1;
                    var step = $input.attr('step') * 1;
                    var value = $input.val() * 1;
                    var price = $price.val() * 1;
                    var discount_price = $price.val() * (1 - window.customer_discount / 100);
                    var discount_item_price = $price.val() * (1 - window.item_discount / 100);
                    if ($(this).hasClass('count_minus')) {
                        value -= step;
                    } else {
                        value += step;
                    }
                    if (value <= 0) {
                        value = 0
                    }
                    if (value >= max) {
                        value = max;
                    }
                    $input.val(value);
                    $('.total_price .total').html(App.basket.numberWithCommas((price * value).toFixed(2)) + ' ' + shop_currency);

                    if (window.item_discount) {
                        $('.total_price .total_new').html(App.basket.numberWithCommas((discount_item_price * value).toFixed(2)) + ' ' + shop_currency);
                    } else if (window.customer_discount) {
                        $('.total_price .total_new').html(App.basket.numberWithCommas((discount_price * value).toFixed(2)) + ' ' + shop_currency);
                    }
                    // App.basket.renderBasket();
                });
                $('body').on('click', '.add_favorite', function () {

                    var this_id = $(this).data('id');
                    var new_item = $(this).data();
                    var favorites = App.storage.getProp('favorites') || [];
                    var find = 0;

                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active');
                        $(this).children('span').text('В избранных');

                        $.each(favorites, function (index) {
                            if (favorites[index].id == new_item.id) {
                                find = 1;
                            }
                        });
                        if (!find) {
                            favorites.push(new_item);
                        }
                    } else {
                        $(this).removeClass('active');
                        $(this).children('span').text('В избранное');
                        var removeByAttr = function (arr, attr, value) {
                            var i = arr.length;
                            while (i--) {
                                if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {
                                    arr.splice(i, 1);
                                }
                            }
                            return arr;
                        }
                        removeByAttr(favorites, 'id', this_id);
                    }
                    App.storage.setProp('favorites', favorites);
                });

                //Поиск
                $("#search").on('keyup', function () {
                    var search_val = $(this).val().trim();
                    if (search_val.length < 4) {
                        return false;
                    }
                    if (search_val.length > 0) {
                        $.ajax({
                            dataType: "json", type: "POST", url: "/ajax/",
                            data: {
                                action: 'search',
                                search: search_val
                            },
                            success: function (data) {
                                if (data.results.items) {
                                    var items = '';
                                    $.each(data.results.items, function (i, item) {
                                        console.log(i, data.results.limit);
                                        items += `<a class="search_item" href="${item['url']}">
                                        <img src="/img/50x50${item['image']}">
                                        <span>${item['title']}</span>
                                    </a>`;
                                    });
                                    if (data.results.total > data.results.limit) {
                                        items += `<a class="search_item all_results" href="/search/?search=${search_val}">
                                    <span>ВСЕ РЕЗУЛЬТАТЫ (${data.results.total})</span>
                                    </a>`;
                                    }
                                    $('#autocomplete').html(items).show();
                                } else {
                                    $('#autocomplete').empty().hide();
                                }
                            }
                        });
                    } else {
                        $('#autocomplete').empty().hide();
                    }
                });

                $('#autocomplete').click(function (e) {
                    e.stopPropagation();
                });

                if (window.item_img_zoom == 1 && window.item_img_zoom != '' && $(window).width() > 1000) {
                    var zoomConfig = {cursor: 'crosshair'};
                    var image = $('.extra_image img');
                    var zoomImage = '';
                    setTimeout(function () {
                        zoomImage = $('.swiper-slide.swiper-slide-active img.big');
                        zoomImage.elevateZoom(zoomConfig);
                    }, 1000);

                    image.on('click', function () {
                        $('.zoomContainer').remove();
                        setTimeout(function () {
                            zoomImage = $('.swiper-slide.swiper-slide-active img.big');
                            zoomImage.removeData('elevateZoom');
                            zoomImage.attr('src', $(this).data('image'));
                            zoomImage.data('zoom-image', $(this).data('zoom-image'));
                            zoomImage.elevateZoom(zoomConfig);
                        }, 500);
                    });
                }
                App.setCookie('editor', 'passive');                

            },
            init: function () {
                console.log('addshop init' + App.version);

                App.eventListener()

            }

        };

        App.init();

        return App;

    })();
});
