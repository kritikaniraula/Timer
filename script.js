 class Timer{
    constructor (root){
        root.innerHTML= Timer.getHTML();


        this.el = {
            minutes : root.querySelector(".minutes"),
           seconds : root.querySelector(".seconds"),
           control: root.querySelector(".start"),
           reset: root.querySelector(".reset"),
           
        };

      this.interval = null;
      this.remainingSeconds = 0;

      this.el.control.addEventListener("click", () => {
        if (this.interval === null) {
          this.start();
        } else {
          this.stop();
        }
      });
  
      this.el.reset.addEventListener("click", () => {
          const newLocal = prompt("Enter number of minutes:");
          const inputMinutes = newLocal;
  
        if (inputMinutes < 60) {
          this.stop();
          this.remainingSeconds = inputMinutes * 60;
          this.updateInterfaceTime();
        }
      });

    }


    updateInterfaceTime(){

        const minutes = Math.floor(this.remainingSeconds /60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval == null){
            this.el.control.innerHTML = `<span class ="material-icons"><i class="fa-solid fa-play"></i></span>`;
            this.el.control.classList.add("start");
            this.el.control.classList.remove("timer-btn-stop");
        }
        else{

            this.el.control.innerHTML = `<span class ="material-icons"><i class="fa-solid fa-pause"></i></span>`;
            this.el.control.classList.add("timer-btn-stop");
            this.el.control.classList.remove("start");
        }
    }


    start(){
        if(this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceControls();
    }
    
    static getHTML(){
        return `
           <img src="cloud.jpg">     
               
            <div class="uk-container uk-container-large uk-flex justify-content-center">
                <div class="count-down">
                    <div class="uk-container uk-container-large uk-flex justify-content-center">
                        <span class="timer-part minutes">00</span>
                        <span class="timer-part">:</span>
                        <span class="timer-part seconds">00</span>
                    </div>
                </div> 
                
            </div>  
                

            <div class="icon">
                <div class="uk-container uk-container-large">
                    <div class="uk-flex justify-content-between">
                        <button type="button" class= "control  start"><span class= "material-icons"><i class="fa-solid fa-play"></i></span></button>
                        <button type="button" class= "control reset"><span class= "material-icons"><i class="fa-solid fa-clock"></i></span></button>
                    </div>  
                </div>
            </div>   
              
        `;
    }
}



new Timer(
    document.querySelector(".timer")
);



