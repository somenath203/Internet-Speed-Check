const button = document.querySelector('button');
const progress_bar_color = document.querySelector('.progress');
const progress_bar_div = document.querySelector('.progress');
const displaySpeedResultDiv = document.querySelector('.speed-text');
const displaySpeedResultSpan = document.querySelector('.speed-text-span');

const fileSizeInBits = 1343591 * 8;


const loadImageGIF = () => {

    return new Promise((resolve, reject) => {

        const image = new Image();

        image.src = `./test.gif?${Math.random() * 10000}`; 
    
        let startTime = Date.now();
    
        
        image.onload = () => {
    
            const endTime = Date.now();
    
            const totalTimeToLoadGIF = endTime - startTime;

            resolve(totalTimeToLoadGIF);
    
        }

        image.onerror = (error) => {

            reject(error);

        }

    });


};


const getLoadGIFSpeed = async () => {

    const loadTime = await loadImageGIF();

    if(loadTime < 1) {

        loadTime = 1;

    }

    const speedInBytesPerSeconds = fileSizeInBits / loadTime;

    const speedInKbps = speedInBytesPerSeconds / 1024;

    return speedInKbps;

}


const totalNumberOfTestsForAccurateResult = 100;

const test_result_final = [];

const getAverageSpeed = () => {
     
    let sum = test_result_final.reduce((num1, num2) => {

        return num1+num2;

    }, 0);

    return sum / test_result_final.length;
};

button.addEventListener('click', async () => {

    button.textContent = 'Checking...';

    for (let i = 0; i < totalNumberOfTestsForAccurateResult; i++) {

        const speed = await getLoadGIFSpeed();

        test_result_final.push(speed);

        progress_bar_color.style.width = `${(((i + 1) / totalNumberOfTestsForAccurateResult) * 100)}%` 


        displaySpeedResultSpan.textContent = `${getAverageSpeed()} kbps`;

        displaySpeedResultDiv.style.display = 'block';

    }

    button.textContent = 'Check Internet Speed';

});