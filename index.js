var imageDescription = document.getElementById("description-text");
var projectImage = document.getElementById("current-image");

var nextImgButton = document.getElementById("next-image");
var previousImgButton = document.getElementById("previous-image");

var currentProject = 0;
var currentImage = 0;

var descriptions = [["Landing page. Shows the most recently updated version of the map. The date of this version is displayed in the date picker in the top left.","Map key is toggled on.","Date picker open in the top left. Choose a date to see the historical control of territory in Iraq and Syria","Now displaying the map from a previously selected date."]
                    ,["Press IT game. Press the button once a minute/hour/day every minute/hour/day to increase your score. Score resets if you do not press the button in time.","Sign Up with a new username and password or login with an existing account.","View the leaderboard to see records for highest current scores and highest alltime scores in each time category.","4"]
                    ,["Landing page. Must first set your home location before adding any classes.", "Place a pin the the map for your home location.", "Add class page. Input name, schedule and location of your class.", "View your newly created class page with your schedule and instructions on when to leave from your home location in order to arrive on time."]];


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

nextImgButton.addEventListener('click', function(){
    if(currentImage < 3){
        currentImage ++;
    }else{
        currentImage = 0;
    }
    updateProject();
});

previousImgButton.addEventListener('click', function(){
    if(currentImage > 0){
        currentImage --;
    }else{
        currentImage = 3;
    }
    updateProject();
});

function setProject(ele){
    console.log(ele);
    currentProject = ele.getAttribute("num");
    currentImage = 0;
    updateProject();
}

function updateProject(){
    projectImage.src = `ProjectImages/${currentProject}/${currentImage}.png`
    imageDescription.innerHTML = descriptions[currentProject][currentImage];
    document.getElementById('imageNumber').innerHTML = `${currentImage+1}/4`;
}
updateProject()

function scrollToY(scrollTargetY, speed, easing) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    var scrollY = window.scrollY,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;

    // min time .1, max time .8 seconds
    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    var PI_D2 = Math.PI / 2,
        easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            console.log('scroll done');
            window.scrollTo(0, scrollTargetY);
        }
    }

    tick();
}