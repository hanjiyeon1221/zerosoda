$(document).ready(function(){
    /* 메인 애니메이션 */ 
    $('.home .slogan p').stop().animate({'left': 250, 'opacity': 1}, 1500);
    $('.home a').stop().animate({'opacity': 1}, 1500);
    $('.home img').stop().delay(1500).animate({'bottom': -100, 'opacity': 1}, 1000);

    //이미지 자동 체인지
    // let i = 1;
    // function imgchange(){
    //     i++;
    //     $('.home .bgcolor img').attr('src',`./image/can${i}.png`);
    //     if(i >= 3 ){
    //         i = 1;
    //     }  
    // }
    // setInterval(imgchange, 3000)


/* 슬라이드 */ 
let cnt = 0; // 0 1 2...
let total = $(".soda_img img").size();  //3
//console.log(total);

$('.soda_img img:eq(0)').show();
$('.soda_name p:eq(0)').show();

$(".soda_btn a").on("click",function(e){
    e.preventDefault();

    //만약 클릭할 때 pre면 -1
    //만약 클릭할 때 next면 +1

    function imgName(){
         //이미지 전부 hide, 해당되는 이미지만 보이게
         $('.soda_img img').hide();
         $(`.soda_img img:eq(${cnt-1})`).fadeIn();
 
         //맛 타이틀 전부 hide, 해당되는 타이틀만 보이게
         $('.soda_name p').hide();
         $(`.soda_name p:eq(${cnt-1})`).fadeIn();
    }

    if($(this).hasClass('pre')){ // 이전 버튼 누르면
        cnt--;
        if(cnt <= 0){
            cnt = total;
        }
        imgName()
    }

    if($(this).hasClass('next')){ // 다음 버튼 누르면
        cnt++;
        if(cnt == total+1){
            cnt = 1;
        }
       // console.log(cnt)
       imgName()
    }

    if(cnt == 1){
        $('.soda_name p').css('color','#fe6b98');
        $('.what svg .cls-1').css('stroke','#fe6b98');
        $(".soda_btn a").css('background','#fe6b98')
    } else if(cnt == 2){
        $('.soda_name p').css('color','#9e4aa0');
        $('.what svg .cls-1').css('stroke','#9e4aa0');
        $(".soda_btn a").css('background','#9e4aa0')
    } else if(cnt == 3){
        $('.soda_name p').css('color','#ff9e40');
        $('.what svg .cls-1').css('stroke','#ff9e40');
        $(".soda_btn a").css('background','#ff9e40')
    }
    //console.log(cnt)
    
});


//가로스크롤(구글링 참고)
// 1. box와 box를 감싸고 있는 container의 가로세로값을 각각 지정해준다.
// 2. 스크롤을 내릴 시, 화면에 (보이는창) 나타는 값은 제외해줘야 한다. (스크롤의 리미트) 
// 3. 휠을 한번 내릴때 (휠의 방향을 감지 함수) 그 값 만큼, box를 감싸고 있는 container가 - 방향으로 움직인다. 
// 4. 휠을 한번 올릴때 (휠의 방향을 감지 함수) 그 값 만큼, box를 감싸고 있는 container가 + 방향으로 움직인다. 
// 5. sec이 처음일때와 마지막일 때를 고려한다. (현재 sec의 방번호 prev()와 next() 의 개수가 0보다 작으면 sec이 없다는 뜻)
// 6. 브라우저 사이즈를 조정했을 경우를 대비해 resize 함수 실행

let d_width = 0; // 브라우저 가로
let d_height = 0; // 문서 전체의 높이

function tmp() {
    // content의 가로사이즈(화면가로 * section 개수)
    let con_width = $(window).outerWidth() * $('section').length;   //outerWidth(): 요소의 width값 + padding값 + border값

    $('#content').css({
        width: con_width,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
    });

    $('section').css({
        width: con_width / $('section').length   // content 너비/2
    });

    // section들을 위로 끌어올렸기 때문에 body의 높이는 100vh나 마찬가지인 상태. 
    // 그래서 억지로 전체 section들의 세로크기 만큼 body에 줘야한다.(스크롤 내리기위함) 
    // 이때 높이는 가로영역의 비율과 동일하게 준다. (이후 리미트를 주게 됨으로써 비율의 값이 정해진다.)
    $('body').css({
        height: '100vh'
    });

    let w_width = $(window).width(); // 화면의 가로값
    let w_height = $(window).height() // 화면의 세로값
    // 스크롤 될때의 리미트
    d_width = con_width - w_width; // 전체 가로값(section의 총 가로값) - 현재 화면의 가로값
    d_height = $('body').height() - w_height // 전체 세로값 - 현재 화면의 세로값
}
tmp();

let array = [];
for(let i=0; i<$('section').length; i++) {   //sention의 offset.left값을 배열에 담기
    array[i] = $('section').eq(i).offset().left    //offset().left 상하좌우 좌표위치를 가져옴
}

let chk = true;

$('section').on('mousewheel DOMMouseScroll', function(event){    //파이어폭스는 mousewheel 지원X -> DOMMouseScroll

    if(chk) {   //true
        // 휠 일정시간동안 막기
        chk = false;
        setTimeout(function(){
            chk = true;
        }, 500)

        // 휠 방향 감지(아래: -120, 위: 120)
        let w_delta = event.originalEvent.wheelDelta / 120;
        
        // 휠 아래로
        if(w_delta < 0 && $(this).next().length > 0) {   // delta값 -1 && section의 개수가 0보다 크면 
            $('#content').animate({
                left: -array[$(this).index()+1]
            }, 400)
        }
        // 휠 위로
        else if(w_delta > 0 && $(this).prev().length > 0) {
            $('#content').animate({
                left: -array[$(this).index()-1]
            }, 400)
        }
    }
});

/* 네비 클릭시 해당 페이지로 자동 슬라이드 */
//offsetLeft값 구하고
//클릭하면 left값이 offsetLeft값만큼 이동
const contentBox = document.getElementById('content');
const listBtn = document.querySelectorAll('#gnb ul li');
const section = document.getElementsByTagName('section');


listBtn.forEach(function(arr, ind) {
        listBtn[ind].addEventListener('click', function(){
        contentBox.style.transition = '.5s' 
        contentBox.style.left = -section[ind].offsetLeft+'px';
    })
});


});


