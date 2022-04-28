import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);
  const nameInputRef = useRef(null);
  const idInputRef = useRef(null);

  const [buttonText, setButtonText] = useState("Capture");

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('error:', err);
      });
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');

    const width = 320;
    const height = 320;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
    }, 200);
  };

  const takePhoto = (mode) => {
    if (mode === "Retake") {
      photoRef.current.style.display = 'unset';
      stripRef.current.style.display = 'none';
      setButtonText("Capture")
      return
    }
    let photo = photoRef.current;
    let strip = stripRef.current;

    const data = photo.toDataURL('image/jpeg');

    strip.innerHTML = `<img src='${data}' alt='thumbnail' width='100%'/>`;
    photoRef.current.style.display = 'none';
    stripRef.current.style.display = 'unset';
    setButtonText("Retake")
    console.log(photoRef.current);
  };

  const print = () => {
    console.log('printing............', stripRef);
    const name = nameInputRef.current.value
    const id = idInputRef.current.value
    if (stripRef.current.innerHTML === '') {
      alert("Please capture your photo")
      return
    }
    if (name === '' || id === '') {
      alert("Please enter name & id")
      return
    }


    // var divContents = printRef.current.innerHTML; // document.getElementById("root").innerHTML;
    var a = window.open('', '', 'height=500, width=600');

    a.document.write('<style type="text/css" media="print"> @page { size: landscape; } </style>');
    a.document.write('<html>');
    a.document.write(
      '<body style="width:400; height:250; margin:30px; border:1px dotted grey; display:flex; gap: 20px; justify-content: center; align-items: center;">'
    );
    a.document.write(`<div style="width: 200px;">` + stripRef.current.innerHTML + `</div>`);
    a.document.write(`<div  style="display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            gap: 20px;">`)
    a.document.write(`<h4 style="margin-bottom: 6px;"> Performix</h4>`);
    a.document.write(`<div>` + id + `</div>`);
    a.document.write(`<div>` + name + `</div>`);
    a.document.write(`</div>`)
    a.document.write('</body></html>');
    a.document.close();
    a.print();
  };

  return (
    <div className="wrapper">
      <div className="video-preview">
        <div className='capture-heading'>Capture Image</div>
        <video
          className="hidden-video-feed"
          onCanPlay={() => paintToCanvas()}
          ref={videoRef}
        />
        <canvas className="video-feed" ref={photoRef} />
        <div className="photo-captured" ref={stripRef} />
        <button className="capture-button" onClick={() => takePhoto(buttonText)}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000"
              width="32px" height="32px" style={{ fill: buttonText === "Capture" ? 'white' : '#b1b1b1' }}>
              <g><g transform="translate(0.000000,360.000000) scale(0.100000,-0.100000)">
                <path d="M3756.2,2046.2c-115.5-28.9-234.9-100.1-319.6-190.6c-46.2-50.1-194.5-273.4-329.2-498.7l-246.5-408.2L1721.1,943C591,937.2,581.3,937.2,488.9,894.8C367.6,837.1,213.6,690.7,152,571.4l-52-96.3v-2435.6V-4396l52-96.3c67.4-130.9,186.8-246.4,319.6-311.9l109.8-53.9H5000h4418.7l105.9,52c130.9,63.5,258,186.8,325.4,313.8l50,96.3v2435.6V475.1l-52,96.3c-61.6,119.4-215.6,265.7-336.9,323.5c-92.4,42.4-102,42.4-1232.2,48.1L7139,948.7l-246.4,408.2c-271.5,452.5-362,564.1-523.7,643.1l-107.8,53.9l-1222.6,3.9C4366.6,2059.7,3789,2053.9,3756.2,2046.2z M6184.1,1589.9c53.9-25,113.6-113.6,358.1-519.8C6703.9,800.5,6856,561.7,6883,540.6c46.2-34.7,88.6-36.6,1220.7-36.6c1047.4,0,1182.1-3.9,1239.9-30.8c130.9-61.6,123.2,96.3,123.2-2433.6c0-2529.9,7.7-2372-123.2-2433.6c-59.7-28.9-423.6-30.8-4341.6-30.8c-3652.4,0-4287.7,3.9-4343.6,27c-132.8,55.8-125.1-105.9-125.1,2437.5c0,2529.9-7.7,2372,123.2,2433.6C714.2,500.1,849,504,1896.3,504c1132.1,0,1174.5,1.9,1220.7,36.6c27,21.2,179.1,258,340.8,529.5c234.9,392.8,306.1,494.8,354.3,519.8c53.9,26.9,206,30.8,1184.1,30.8C5980,1620.7,6128.2,1616.8,6184.1,1589.9z" /><path d="M4730.4,482.8c-448.6-52-920.3-275.3-1261.1-596.9c-1137.9-1076.3-851-2940,556.4-3627.4c369.7-181,758.6-254.1,1172.5-217.6c870.3,73.2,1640.4,677.7,1917.7,1507.5c450.5,1351.6-458.2,2776.4-1871.4,2934.2C5036.6,505.9,4938.4,505.9,4730.4,482.8z M5362,11.1c327.3-67.4,625.7-227.2,876-467.9c246.4-236.8,415.9-529.5,498.7-860.6c59.7-240.7,59.7-602.6,0-841.4c-171.4-689.3-737.4-1216.8-1436.3-1340c-148.2-27-452.5-27-600.7,0c-700.8,123.2-1263,648.8-1436.3,1340c-61.6,242.6-59.7,621.9,1.9,852.9c80.9,308.1,223.3,566.1,433.2,787.5C3968-237.3,4268.4-65.9,4634.2,11.1C4807.5,49.6,5179.1,49.6,5362,11.1z" /><path d="M4769-414.4c-98.2-15.4-302.3-88.6-404.3-142.5c-406.3-215.6-693.1-679.6-700.8-1130.2c-1.9-140.5-1.9-142.5,69.3-207.9c78.9-71.2,159.8-84.7,244.5-40.4c84.7,42.4,117.4,111.7,136.7,281.1c30.8,267.6,148.3,479.4,352.3,629.6c140.6,104,281.1,157.9,477.5,179.1c169.4,19.3,215.6,46.2,261.9,152.1c40.4,96.3-3.8,219.5-94.4,265.7C5063.5-402.9,4882.6-395.2,4769-414.4z" /><path d="M7633.9,38c-34.6-5.8-86.6-38.5-115.5-71.2c-53.9-59.7-53.9-61.6-53.9-350.4c0-321.5,15.4-379.3,115.5-431.3c82.8-42.4,1245.7-42.4,1328.5,0c98.2,52,115.5,111.7,115.5,417.8c0,294.6-11.5,340.8-96.3,404.3c-44.3,32.7-96.3,36.6-639.2,40.4C7963.1,49.6,7668.5,45.8,7633.9,38z" /></g></g>
            </svg>
          </span>
          <span style={{ minWidth: '75px', color: buttonText === "Capture" ? 'white' : '#b1b1b1' }}>
            {buttonText}
          </span>
        </button>

      </div>

      <div className="name-id-input">
        <label>Name</label>
        <input placeholder='Enter name here' ref={nameInputRef} ></input>
        <label>ID</label>
        <input placeholder='Enter Id number here' ref={idInputRef}></input>

        <button className="print-button" onClick={() => print()}>
          Print
        </button>
      </div>

      {/* <div className="print-preview-hidden" ref={printRef} >
       <div className="print-photo" ref={printPhotoRef} />
      </div> */}

    </div >
  );
};

export default App;
