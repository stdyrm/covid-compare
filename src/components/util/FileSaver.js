import { saveAs } from 'file-saver';

const canvas = document.querySelector("#canvas")

const FileSaver = () => {
    if (canvas) {
        console.log('Saving canvas ...')
        canvas.toBlob((blob) => {
            saveAs(blob, "covid-19_chart")
        });
    }
};

export { FileSaver };