$(document).ready(function() {

	$.validator.addMethod(
	    "expiration",
	    function(value, element) {
			var year = '20' +  $('#fields_expyear').val();
			var month = $('#fields_expmonth').val();
			
			if ($('#fields_expmonth').val() !== '' && $('#fields_expyear').val() !== '') {
				// if expired
				var result =  (new Date(year, month) < new Date()) ? false : true;
				if (result == false) {
					$('#fields_expmonth').addClass('valid_error');
				}
				return result;
			} else {
				return false;
			}
	    },
	    "Please select a valid (not expired) Month and Year"
	);

	$('#info_form').validate({
        errorPlacement: function(error, element) {
            error.insertBefore(element);
            error.addClass('valid_error');
        },
        rules: {
            fields_fname: {
                required: true,
                lettersonly: true
            },
            fields_lname: {
                required: true,
                lettersonly: true
            },
            email: {
                required: true,
                email: true
            },
            fields_address: {
                required: true,
                maxlength: 150
            },
            state: {
                required: true
            },
            fields_phone: {
                required: true,
                phoneUS: true,
                maxlength: 10,
                minlength: 10,
                digits: true
            },
            fields_zip: {
                required: true,
                maxlength: 6,
                minlength: 5,
                digits: true
            },
            fields_city: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            fields_fname: {
                required: 'Please enter your First Name',
                lettersonly: 'First Name must be letters only'
            },
            fields_lname: {
                required: 'Please enter your Last Name',
                lettersonly: 'Last Name must be letters only'
            },
            fields_city: {
                required: 'Please enter your City',
                minlength: 'Your City name can\'t be less than 2 letters'
            },
            fields_zip: {
                required: 'Please enter your ZIP code',
                minlength: 'Your ZIP code can\'t be less than 5 characters',
                maxlength: 'Your ZIP code can\'t be more than 5 characters',
                digits: 'Your ZIP code must use digits only'
            },
            fields_address: {
                required: 'Please enter your address',
                maxlength: 'Your address can\'t be more than 150 characters'
            },
            state: {
                required: 'Please select your state'  
            },
            email: {
                required: 'Please enter your email address',
                email: 'Please enter a valid email address'
            },
            fields_phone: {
                required: 'Please enter a valid US phone!',
                maxlength: 'A valid US phone number can\'t be more than 10 digits',
                minlength: 'A valid US phone number can\'t be less than 10 digits',
                digits: 'Please digits only'
            }
        },
        onkeyup: false,
        highlight : function (element) {
            $(element).addClass('input_error');
        },
        unhighlight : function (element) {
            $(element).removeClass('input_error');
        }
    });

	$('#cc_form').validate({
        errorPlacement: function(error, element) {
            error.insertBefore(element);
            error.addClass('valid_error');
        },
        rules: {
            cc_type: {
                required: true
            },
            cc_number: {
                required: true,
                digits: true
            },
            fields_expmonth: {
                required: true
            },
            fields_expyear: {
                required: true,
				expiration: true
            },
            cc_cvv: {
                required: true,
                digits: true,
				minlength: 3
            }
        },
        messages: {
            cc_type: {
                required: 'Please select your Card Type' 
            },
            cc_number: {
                required: 'Please enter your Card Number',
                digits: 'Please numbers only'
            },
            fields_expmonth: {
                required: 'Please select your Expiration Month'
            },
            fields_expyear: {
                required: 'Please select your Expiration Year'
            },
            cc_cvv: {
                required: 'Please enter your CVV code',
                digits: 'Please numbers only',
				minlength: 'CVV number can\'t be less than 3 digits',
            }
        },
        onkeyup: false,
        highlight : function (element) {
            $(element).addClass('input_error');
			var year = '20' +  $('#fields_expyear').val();
			var month = $('#fields_expmonth').val();
			
			if ($('#fields_expmonth').val() !== '' && $('#fields_expyear').val() !== '') {
				var result =  (new Date(year, month) < new Date()) ? false : true;
				if (result == false) {
					$('#fields_expmonth').addClass('input_error');
					$('#fields_expyear').addClass('input_error');
				} else if (result == true) {
					$('#fields_expmonth').removeClass('input_error');
					$('#fields_expyear').removeClass('input_error');
				}
			}
        },
        unhighlight : function (element) {
            $(element).removeClass('input_error');
			var year = '20' +  $('#fields_expyear').val();
			var month = $('#fields_expmonth').val();
			
			if ($('#fields_expmonth').val() !== '' && $('#fields_expyear').val() !== '') {
				var result =  (new Date(year, month) < new Date()) ? false : true;
				if (result == false) {
					$('#fields_expmonth').removeClass('input_error');
					$('#fields_expyear').removeClass('input_error');
				} else if (result == true) {
					$('#fields_expmonth').removeClass('input_error');
					$('#fields_expyear').removeClass('input_error');
				}
			}
        }
    });

	$('.singlepage-nav').singlePageNav({
        offset: 0,
        filter: ':not(.external)',
        updateHash: true,
        currentClass: 'current',
        easing: 'swing',
        speed: 750,
        beforeStart: function () {
            if ($(window).width() < 991) {
                $('.singlepage-nav > ul').hide();
            };
        },
        onComplete: function () {
            console.log('done scrolling');
        }
    });

	//show cart after page reload
	if (sessionStorage.getItem('onReload') === 'activate') {
    	sessionStorage.setItem('onReload', '');
		
		update_total();        

		$('.cart .cart-dropdown').css("visibility", "visible");
		$('.cart .cart-dropdown').css("opacity", 1);
	}

	//initial selection
	$('#best_seller').attr('checked', true);
	$('#best_seller2').attr('checked', true);
	$('#best_seller3').attr('checked', true);
	$('#best_seller4').attr('checked', true);

	// product1 selection
	$('#best_seller').click(function() {
		$('#best_seller').attr('checked', true);
		$('#3_bottles').attr('checked', false);
		$('#1_bottle').attr('checked', false);
	});
	
	$('#3_bottles').click(function() {
		console.log('click');
		$('#3_bottles').attr('checked', true);
		$('#best_seller').attr('checked', false);
		$('#1_bottle').attr('checked', false);
	});

	$('#1_bottle').click(function() {
		$('#1_bottle').attr('checked', true);
		$('#best_seller').attr('checked', false);
		$('#3_bottles').attr('checked', false);
	});

	// product2 selection
	$('#best_seller2').click(function() {
		$('#best_seller2').attr('checked', true);
		$('#3_bottles2').attr('checked', false);
		$('#1_bottle2').attr('checked', false);
	});
	
	$('#3_bottles2').click(function() {
		$('#3_bottles2').attr('checked', true);
		$('#best_seller2').attr('checked', false);
		$('#1_bottle2').attr('checked', false);
	});

	$('#1_bottle2').click(function() {
		$('#1_bottle2').attr('checked', true);
		$('#best_seller2').attr('checked', false);
		$('#3_bottles2').attr('checked', false);
	});

	// product3 selection
	$('#best_seller3').click(function() {
		$('#best_seller3').attr('checked', true);
		$('#3_bottles3').attr('checked', false);
		$('#1_bottle3').attr('checked', false);
	});
	
	$('#3_bottles3').click(function() {
		$('#3_bottles3').attr('checked', true);
		$('#best_seller3').attr('checked', false);
		$('#1_bottle3').attr('checked', false);
	});

	$('#1_bottle3').click(function() {
		$('#1_bottle3').attr('checked', true);
		$('#best_seller3').attr('checked', false);
		$('#3_bottles3').attr('checked', false);
	});

	// product4 selection
	$('#best_seller4').click(function() {
		$('#best_seller4').attr('checked', true);
		$('#3_bottles4').attr('checked', false);
		$('#1_bottle4').attr('checked', false);
	});
	
	$('#3_bottles4').click(function() {
		$('#3_bottles4').attr('checked', true);
		$('#best_seller4').attr('checked', false);
		$('#1_bottle4').attr('checked', false);
	});

	$('#1_bottle4').click(function() {
		$('#1_bottle4').attr('checked', true);
		$('#best_seller4').attr('checked', false);
		$('#3_bottles4').attr('checked', false);
	});

	// hide shopping cart on mouse click away
	$(window).click(function() {
		//Hide the menus if visible
		$('.cart .cart-dropdown').css("visibility", "hidden");
		$('.cart .cart-dropdown').css("opacity", 0);
	});

	// hide shopping cart on X click
	$('#close_cart').click(function(e) {
		e.preventDefault();
		$('.cart .cart-dropdown').css("visibility", "hidden");
		$('.cart .cart-dropdown').css("opacity", 0);
	});

	// show cart dropdown on mouse over
	$('.header-icon').mouseover(function() {
		// prevents cart dropdawn to appear on checkout page
		var current_url = window.location.pathname;
		var checkout_page = global_directory + 'public/index.php/home/checkout';

		if (current_url !== checkout_page) {
			var total_items = $('.cart-notification').text();
		
			if (total_items > 0) {
				$('.cart .cart-dropdown').css("visibility", "visible");
				$('.cart .cart-dropdown').css("opacity", 1);
			} else {
				$('.cart-dropdown').hide();
			}
		}
	});

	$('#track_order').click(function(e) {
		e.preventDefault();
		if (!$('#track_order').hasClass('flagged')) {
			var order_id = $('#order_id').val();

			if (order_id) {
				$.ajax({
					type: 'post',
					dataType: 'json',
					data: {'order_id' : order_id},
					url: base_url + 'order/get_order_status',
					success: function(result) {
						if (result) {
							console.log(result[0]);
							console.log(result[1]);
							// when tracking number is available
							if (result[0] == true) {
								$('#title').hide();
								$('#order').hide();
								$('#link').html('<a target="_blank" href="https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=' + result[1] + '%2C">Click here in order to track your package</a>');
								$('#link').show();
							} else if (result[0] == false) {
								$('#title').hide();
								$('#order').hide();
								$('#link').text(result[1]);
								$('#link').show();
							}
							
							// track order again
							$('#track_order').text('Track another order');
							// set new class for button 
							$('#track_order').addClass('flagged');
						}
					}
					// error: function(xhr, textStatus, errorThrown) {
				 //       	console.log(textStatus);
					// 	console.log(xhr);
				 //    }
				});
			}
		} else {
			location.reload();
		}
	});

	$('#add_to_cart_product_1').click(function(e) {
		e.preventDefault();
		var product_id,title,price,image,best_seller_title,product,key;
		key = $('.image').attr('key');
		image = $('.image').attr('data');
		// when radio selected
		if ($('#best_seller').attr('checked') == 'checked') {
			product_id = $('#best_seller').val();
			product = $('.best_seller_title').attr('data2');
			// get html with title
			best_seller_title = $('.best_seller_title').html();
			// split html
			var parts = best_seller_title.split(';');
			// title  which is needed is 3
			title = parts[2] + ' ' + product;
			price = $('.best_seller_title').attr('data');
		} else if ($('#3_bottles').attr('checked') == 'checked') {
			product_id = $('#3_bottles').val();
			product = $('.3_bottles_title').attr('data2');
			title = $('.3_bottles_title').text() + ' ' + product;
			price = $('.3_bottles_title').attr('data');
		} else if ($('#1_bottle').attr('checked') == 'checked') {
			product_id = $('#1_bottle').val();
			product = $('.1_bottle_title').attr('data2');
			title = $('.1_bottle_title').text() + ' ' + product;
			price = $('.1_bottle_title').attr('data');
		}
		
		if (product_id) {	
			$.ajax({
				type: 'post',
				dataType: 'json',
				data: {
					'product_id' : product_id,
					'title' : title,
					'price' : price,
					'image' : image,
					'key' : key
				},
				url: base_url + 'cart/add_item',
				success: function(result) {
					if (result) {
						sessionStorage.setItem('onReload', 'activate');
						location.reload();
					}
				}
			});
		}
	});

	$('#add_to_cart_product_2').click(function(e) {
		e.preventDefault();
		var product_id,title,price,image,best_seller_title,product,key;

		image = $('.image2').attr('data');
		key = $('.image2').attr('key');
		// when radio selected
		if ($('#best_seller2').attr('checked') == 'checked') {
			product_id = $('#best_seller2').val();
			product = $('.best_seller_title2').attr('data2');
			// get html with title
			best_seller_title = $('.best_seller_title2').html();
			// split html
			var parts = best_seller_title.split(';');
			// title  which is needed is 3
			title = parts[2] + ' ' + product;
			price = $('.best_seller_title2').attr('data');
		} else if ($('#3_bottles2').attr('checked') == 'checked') {
			product_id = $('#3_bottles2').val();
			product = $('.3_bottles_title2').attr('data2');
			title = $('.3_bottles_title2').text() + ' ' + product;
			price = $('.3_bottles_title2').attr('data');
		} else if ($('#1_bottle2').attr('checked') == 'checked') {
			product_id = $('#1_bottle2').val();
			product = $('.1_bottle_title2').attr('data2');
			title = $('.1_bottle_title2').text() + ' ' + product;
			price = $('.1_bottle_title2').attr('data');
		}
		
		if (product_id) {	
			$.ajax({
				type: 'post',
				dataType: 'json',
				data: {
					'product_id' : product_id,
					'title' : title,
					'price' : price,
					'image' : image,
					'key' : key
				},
				url: base_url + 'cart/add_item',
				success: function(result) {
					if (result) {
						sessionStorage.setItem('onReload', 'activate');
						location.reload();
					}
				}
			});
		}
	});

	$('#add_to_cart_product_3').click(function(e) {
		e.preventDefault();
		var product_id,title,price,image,best_seller_title,product,key;

		key = $('.image3').attr('key');
		image = $('.image3').attr('data');
		// when radio selected
		if ($('#best_seller3').attr('checked') == 'checked') {
			product_id = $('#best_seller3').val();
			product = $('.best_seller_title3').attr('data2');
			// get html with title
			best_seller_title = $('.best_seller_title3').html();
			// split html
			var parts = best_seller_title.split(';');
			// title  which is needed is 3
			title = parts[2] + ' ' + product;
			price = $('.best_seller_title3').attr('data');
		} else if ($('#3_bottles3').attr('checked') == 'checked') {
			product = $('.3_bottles_title3').attr('data2');
			product_id = $('#3_bottles3').val();
			title = $('.3_bottles_title3').text() + ' ' + product;
			price = $('.3_bottles_title3').attr('data');
		} else if ($('#1_bottle3').attr('checked') == 'checked') {
			product = $('.1_bottle_title3').attr('data2');
			product_id = $('#1_bottle3').val();
			title = $('.1_bottle_title3').text() + ' ' + product;
			price = $('.1_bottle_title3').attr('data');
		}
		
		if (product_id) {	
			$.ajax({
				type: 'post',
				dataType: 'json',
				data: {
					'product_id' : product_id,
					'title' : title,
					'price' : price,
					'image' : image,
					'key' : key
				},
				url: base_url + 'cart/add_item',
				success: function(result) {
					if (result) {
						sessionStorage.setItem('onReload', 'activate');
						location.reload();
					}
				}
			});
		}
	});

	$('#add_to_cart_product_4').click(function(e) {
		e.preventDefault();
		var product_id,title,price,image,best_seller_title,product,key;

		key = $('.image4').attr('key');
		image = $('.image4').attr('data');
		// when radio selected
		if ($('#best_seller4').attr('checked') == 'checked') {
			product = $('.best_seller_title4').attr('data2');
			product_id = $('#best_seller4').val();
			// get html with title
			best_seller_title = $('.best_seller_title4').html();
			// split html
			var parts = best_seller_title.split(';');
			// title  which is needed is 3
			title = parts[2] + ' ' + product;
			price = $('.best_seller_title4').attr('data');
		} else if ($('#3_bottles4').attr('checked') == 'checked') {
			product = $('.3_bottles_title4').attr('data2');
			product_id = $('#3_bottles4').val();
			title = $('.3_bottles_title4').text() + ' ' + product;
			price = $('.3_bottles_title4').attr('data');
		} else if ($('#1_bottle4').attr('checked') == 'checked') {
			product = $('.1_bottle_title4').attr('data2');
			product_id = $('#1_bottle4').val();
			title = $('.1_bottle_title4').text() + ' ' + product;
			price = $('.1_bottle_title4').attr('data');
		}
		
		if (product_id) {	
			$.ajax({
				type: 'post',
				dataType: 'json',
				data: {
					'product_id' : product_id,
					'title' : title,
					'price' : price,
					'image' : image,
					'key' : key
				},
				url: base_url + 'cart/add_item',
				success: function(result) {
					if (result) {
						sessionStorage.setItem('onReload', 'activate');
						location.reload();
					}
				}
			});
		}
	});

	// add value to the cart
	$('#value_1').click(function(e) {
		e.preventDefault();
		var product_id,title,price,image,product,key;
		key = 0;

		product = $('#value_1').attr('data_title2');
		image = $('#value_1_image').attr('src');
		product_id = $('#value_1').attr('data_id');
		title = $('#value_1').attr('data_title') + ' (' + product + ')';
		price = $('#value_1').attr('data_price');

		if (product_id) {
			$.ajax({
				type: 'post',
				dataType: 'json',
				data: {
					'product_id' : product_id,
					'title' : title,
					'price' : price,
					'image' : image,
					'key' : key
				},
				url: base_url + 'cart/add_item',
				success: function(result) {
					if (result) {
						sessionStorage.setItem('onReload', 'activate');
						location.reload();
					}
				}
			});
		}
	});

	// add value to the cart
	$('#value_2').click(function(e) {
		e.preventDefault();
		var product_id,title,price,image,product,key;
		key = 0;

		product = $('#value_2').attr('data_title2');
		image = $('#value_2_image').attr('src');
		product_id = $('#value_2').attr('data_id');
		title = $('#value_2').attr('data_title') + ' (' + product + ')';;
		price = $('#value_2').attr('data_price');

		if (product_id) {
			$.ajax({
				type: 'post',
				dataType: 'json',
				data: {
					'product_id' : product_id,
					'title' : title,
					'price' : price,
					'image' : image,
					'key' : key
				},
				url: base_url + 'cart/add_item',
				success: function(result) {
					if (result) {
						sessionStorage.setItem('onReload', 'activate');
						location.reload();
					}
				}
			});
		}
	});

	// add value to the cart
	$('#value_3').click(function(e) {
		e.preventDefault();
		var product_id,title,price,image,key;
		key = 0;

		image = $('#value_3_image').attr('src');
		product_id = $('#value_3').attr('data_id');
		title = $('#value_3').attr('data_title');
		price = $('#value_3').attr('data_price');

		if (product_id) {
			$.ajax({
				type: 'post',
				dataType: 'json',
				data: {
					'product_id' : product_id,
					'title' : title,
					'price' : price,
					'image' : image,
					'key' : key
				},
				url: base_url + 'cart/add_item',
				success: function(result) {
					if (result) {
						sessionStorage.setItem('onReload', 'activate');
						location.reload();
					}
				}
			});
		}
	});

	// add value to the cart
	$('#value_4').click(function(e) {
		e.preventDefault();
		var product_id,title,price,image,key;
		key = 0;

		image = $('#value_4_image').attr('src');
		product_id = $('#value_4').attr('data_id');
		title = $('#value_4').attr('data_title');
		price = $('#value_4').attr('data_price');

		if (product_id) {
			$.ajax({
				type: 'post',
				dataType: 'json',
				data: {
					'product_id' : product_id,
					'title' : title,
					'price' : price,
					'image' : image,
					'key' : key
				},
				url: base_url + 'cart/add_item',
				success: function(result) {
					if (result) {
						sessionStorage.setItem('onReload', 'activate');
						location.reload();
					}
				}
			});
		}
	});

	$('#submit_btn').click(function(e) {
        e.preventDefault();
        // All checking passed
        if ($('#info_form').valid()) {
			e.preventDefault();
			if ($('#cc_form').valid()) {
	           	$('#loading-indicator').fadeIn(500);
				$('#submit_btn').hide();
				var cart_total =  $('.cart-notification').text();
				var upsell1_key = $('#upsell_1').attr('data2');
				var upsell2_key = $('#upsell_2').attr('data2');
				var upsell3_key = $('#upsell_3').attr('data2');
				var upsell4_key = $('#upsell_4').attr('data2');
				var upsell1_image = $('#upsell_1').attr('data1');
				var upsell2_image = $('#upsell_2').attr('data1');
				var upsell3_image = $('#upsell_3').attr('data1');
				var upsell4_image = $('#upsell_4').attr('data1');

				$.ajax({
	                type:'POST',
					dataType: 'json',
					data: $('#info_form').serialize() + '&' + $('#cc_form').serialize(),
	                url: base_url + 'cart/checkout',
	                success: function(result) {
						if (result == 'success') {
							$('#loading-indicator').hide();
							if (cart_total == 1) {
								var product_key;
								$.ajax({
					                type:'GET',
									dataType: 'json',
					                url: base_url + 'cart/get_items',
					                success: function(result) {
										if (result) {
											var clean_result = [];
											$.each(result, function(key, value) {
												clean_result = value;
											});
											
											product_key = clean_result.key;

											if (product_key == upsell1_key) {
												$('#upsell_image').attr('src', upsell1_image);
												$('#upsell_modal').modal('show');
												$('#modal_key').val(product_key);
											} else if (product_key == upsell2_key) {
												$('#upsell_image').attr('src', upsell2_image);
												$('#upsell_modal').modal('show');
												$('#modal_key').val(product_key);
											} else if (product_key == upsell3_key) {
												$('#upsell_image').attr('src', upsell3_image);
												$('#upsell_modal').modal('show');
												$('#modal_key').val(product_key);
											} else if (product_key == upsell4_key) {
												$('#upsell_image').attr('src', upsell4_image);
												$('#upsell_modal').modal('show');
												$('#modal_key').val(product_key);
											} else if (product_key == 0) {
												$('#upsell_shipping_modal').modal('show');
											}
										}
					                }
								});
							} else {
								$('#upsell_shipping_modal').modal('show');
							}
						}
	                }
	            });   
        	}
		}  
    });

	$('#no_thanks_button_shipping').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		location.href = base_url + 'home/thanks';
	});
	
	$('#no_thanks_button').click(function(e) {
		e.stopPropagation();
		e.preventDefault();

		$('#upsell_shipping_modal').modal('show').delay(800);
	});

	$('#upsell_image').click(function(e) {
		e.stopPropagation();
		e.preventDefault();

		var modal_key = $('#modal_key').val();

		if (modal_key > 0) {
			var product_id = 0;
			var upsell1_product_id = $('#upsell_1').attr('data3');
			var upsell2_product_id = $('#upsell_2').attr('data3');
			var upsell3_product_id = $('#upsell_3').attr('data3');
			var upsell4_product_id = $('#upsell_4').attr('data3');
			$('#loading-indicator').fadeIn(500);

			if (modal_key == 1) {
				product_id = upsell1_product_id;
			} else if (modal_key == 2) {
				product_id = upsell2_product_id;
			} else if (modal_key == 3) {
				product_id = upsell3_product_id;
			} else if (modal_key == 4) {
				product_id = upsell4_product_id;
			}

			$.ajax({
				type: 'POST',
				dataType: 'json',
				data: $('#info_form').serialize() + '&' + $('#cc_form').serialize() + '&product_id=' + product_id,
				url: base_url + 'cart/upsell_checkout',
				success: function(result) {
					if (result) {
						if (result == 'success') {
							$('#loading-indicator').hide();
							$('#upsell_shipping_modal').modal('show');
						}
					}
				}
			});
		}
	});

	$('#upsell_image_shipping').click(function(e) {
		e.stopPropagation();
		e.preventDefault();

		var shipping_product_id = $('#shipping_upsell_data').attr('data1');
		$('#loading-indicator').fadeIn(500);
		
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: $('#info_form').serialize() + '&' + $('#cc_form').serialize() + '&product_id=' + shipping_product_id,
			url: base_url + 'cart/upsell_checkout',
			success: function(result) {
				if (result) {
					if (result == 'success') {
						$('#loading-indicator').hide();
						location.href = base_url + 'home/thanks';
					}
				}
			}
		});
	});

	$('#paypal_btn').click(function(e) {
		e.preventDefault();
		if ($('#info_form').valid()) {
			//invoke notification modal
			$('#note').text('Please wait while we are redirecting you to the PayPal website...');
			$('#notification_modal').modal('show');

			$.ajax({
				type: 'post',
				dataType: 'json',
				data: $('#info_form').serialize() + '&key=1',
				url: base_url + 'cart/paypal_checkout',
				success: function(result) {
					if (result) {
						console.log(result);
						location.href = result;
					}
				}
			});
		}
	});

	$('#show_payment').click(function(e){
		e.preventDefault();
		if ($('#info_form').valid()) {
			$('#cc_form').show();
		}
	});

	update_total();
	//hide by default
	$('#cc_form').hide();
});

function send_feedback(token, payer_id) {
	if (token && payer_id) {
		$.ajax({
			type: 'post',
			dataType: 'json',
			data: {
				'token' : token,
				'payer_id' : payer_id
			},
			url: base_url + 'cart/send_paypal_feedback_to_ll',
			success: function(result) {
				if (result) {
					console.log(result);
				}
			}
		});
	}
}

function remove_product(id) {
	var product_id = $('#remove_product_' + id).attr('data');
	var total = 0;

	if (product_id) {
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {'id' : id},
			url: base_url + 'cart/remove_item',
			success: function(result) {
				if (result > 0) {
					$.ajax({
						type: 'GET',
						dataType: 'json',
						url: base_url + 'cart/get_total',
						success: function(total) {
							if (total > 0) {
								location.reload();
							} else {
								location.href = base_url;
							}
						}
					});
				}
			}
		});
	}
}

function update_total() {
	// update cart count 
	console.log(base_url);
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: base_url + 'cart/get_total',
		success: function(result) {
			$('.cart-notification').text(result);
		}
	});
}