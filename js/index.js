//

var getElem = function( selector ){
    return document.querySelector(selector);
  }
  var getAllElem = function( selector ){
    return document.querySelectorAll(selector);
  }

  var getCls = function ( element ) {
    return element.getAttribute("class");
  }

  var setCls = function( element ,cls){
    return element.setAttribute("class",cls);
  }
  

  var addCls = function( element , cls ){
    var baseCls  = getCls(element);
    if( baseCls.indexOf(cls) === -1){
        setCls(element,baseCls+' '+cls); 
    }
    return ;
  }

  var delCls = function( element , cls){
    var baseCls  = getCls(element);
    if( baseCls.indexOf(cls) > -1){ 
        setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
    }
    return ;
  }
  
  var screenAnimateElements = {
    '.screen-1' : [
      '.screen-1_heading',
      '.screen-1_heading_text',
    ],
    '.screen-2' : [
      '.screen-2_heading',
      '.screen-2_heading_text',
      '.screen-2_person',
      '.screen-2_rocket',
    ],
    '.screen-3' : [
      '.screen-3_heading',
      '.screen-3_img',
      '.screen-3_list',
      '.screen-3_skill_list',
    ],
    '.screen-4' : [
      '.screen-4_project_list',
      '.screen-4_project_list_text',
    ]
  
  };
  function setScreenAnimateInit(screenCls) {
      var screen = document.querySelector(screenCls); 
      var animateElements =  screenAnimateElements[screenCls]; 
      for(var i=0;i<animateElements.length;i++){
          var element = document.querySelector(animateElements[i]);
          var baseCls = element.getAttribute('class');
          element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
      }
  }
  
  
  window.onload = function () {
  

    for(k in screenAnimateElements){

      setScreenAnimateInit(k);
    }
    console.log('onload')
  
  }

  function playScreenAnimateDone(screenCls){
      var screen = document.querySelector(screenCls); 
      var animateElements =  screenAnimateElements[screenCls]; 
      for(var i=0;i<animateElements.length;i++){
          var element = document.querySelector(animateElements[i]);
          var baseCls = element.getAttribute('class');
          element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));    
      }
  }
  
  setTimeout(function(){playScreenAnimateDone('.screen-1');},500)


  var navItems = getAllElem('.header__nav-item');
  var outLineItems = getAllElem('.outline__item');
  
  var switchNavItemsActive = function( idx){
    for(var i=0;i<navItems.length;i++){
      console.log(navItems[i]);
      delCls(navItems[i],'header_nav-item_status_active');
       navTip.style.left = 0+'px';
      
    }
    addCls(navItems[idx],'header_nav-item_status_active');
    navTip.style.left = ( idx * 70 )+'px';
    
  
    for(var i=0;i<outLineItems.length;i++){
      delCls(outLineItems[i],'outline_item_status_active');
    }
    addCls(outLineItems[idx],'outline_item_status_active');
  }
  window.onscroll = function () {
  
    var top = document.body.scrollTop; 
    if( top > 100 ){
        addCls( getElem('.header'),'header_status_black' );
        addCls( getElem('.header_logo'),'header_logo_black' );
    }else{
        delCls( getElem('.header'),'header_status_black' );
        delCls( getElem('.header_logo'),'header_logo_black' );
  
        switchNavItemsActive(0); 
    }
  
    if(top > 640*1 ){
        addCls( getElem('.outline'),'outline_status_in' );
    }else{
        delCls( getElem('.outline'),'outline_status_in' );
    }
  
    if( top > ( 640*1 - 80) ){
      playScreenAnimateDone('.screen-2');
      
    }
    console.log(top);
    if( top > (640*2 - 100)){
      playScreenAnimateDone('.screen-3');
    }
    if( top > ( 640*3 - 100) ){
      playScreenAnimateDone('.screen-4');
      // switchNavItemsActive(3); 
    }
    // if( top > ( 640*4 - 100) ){
    //   playScreenAnimateDone('.screen-5');
    //   switchNavItemsActive(4); 
    // }
  }