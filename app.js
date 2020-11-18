
let car = {

    timerCallback: function() {
        if(this.video.paused || this.video.ended){
            return;
        }
        this.computeFrame();
        let self = this;
        setTimeout(function() {
            self.timerCallback();
        }, 0);
            
    }, 
    doDownload: function() {
        this.video = document.querySelector("#video");
        this.c1 = document.querySelector("#c1");
        this.ctx1 = this.c1.getContext("2d");
        this.c2 = document.querySelector("#c2");
         this.ctx2 = this.c2.getContext("2d");
         let self = this;
         this.video.addEventListener('play', function(){
             self.width = self.video.videoWidth;
             self.height = self.video.videoHeight;
             self.timerCallback();

         });
        
    },
    computeFrame: function(){
        this.ctx1.drawImage(this.video,0,0, this.width, this.height);
        let frame = this.ctx1.getImageData(0,0, this.width, this.height  )
        console.log(frame)
        let l = frame.data.length/4;
        for(let i = 1; i<l; i++){
            let r = frame.data[i*4+0];
            let g = frame.data[i*4+1];
            let b = frame.data[i*4+2];
            if (g > 100) frame.data[i*4+3] = 0;
        }
        this.ctx2.putImageData(frame, 0,0 )
        return;
    }
}
document.addEventListener('DOMContentLoaded', ()=>{
    car.doDownload();
})



function myFunction() {

document.getElementById("c2").style.backgroundImage = "url(imageone.png)";
}