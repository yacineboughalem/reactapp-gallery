import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import useTFClassify from "../utils/hooks/useTFClassify";

function Image({ index, image, handleRemove, show }) {
  const [isHovering, setisHovering] = useState(false);
  const imageRef = useRef()
  const { predict, predictions, setPredictions, isLoading } = useTFClassify()

  return (
    <div
      className="relative"
      onMouseEnter={() => setisHovering(true)}
      onMouseLeave={() => setisHovering(false)}
    >
      {(predictions.length > 0 || isLoading) &&

        <span
          className="absolute bg-gray-800 text-white rounded-lg shadow px-2 left-0 ml-5"
          onClick={() => setPredictions([])}
        >
          {isLoading && <p>Fetching results...</p>}
          {
            predictions.map(prediction => (
              <div className="flex justify-between text-sm">
                <p>{prediction.className}</p>
                <p>{Math.floor(prediction.probability * 100)} %</p>
              </div>

            ))
          }
        </span>
      }



      <i
        className={`fas fa-times  hover:text-red-500 absolute right-0 p-2 text-red-200 cursor-pointer  
                       ${isHovering ? "" : "hidden"}`}
        onClick={() => handleRemove(index)}
      ></i>


      <i
        className={`fas fa-search  hover:text-red-500 absolute left-0 p-2 text-red-200 cursor-pointer  
                       ${isHovering ? "" : "hidden"}`}
        onClick={() => predict(imageRef.current)}
      ></i>
      <img
        ref={imageRef}
        onClick={show}
        src={image}
        width={400}
        height={'auto'}
        crossOrigin={"anonymous"}
      />
    </div>
  );
}

// Method 1
// const types = {
//   function(props, propName) {
//     if (typeof (props[propName]) != 'function') {
//       return new Error(`'${propName}' must be a function but you have provided ${typeof props[propName]}`)
//     }
//   },

//   number(props, propName) {
//     if (typeof (props[propName]) != 'number') {
//       return new Error(`'${propName}' must be a number but you have provided ${typeof props[propName]}`)
//     }
//   }

// }

// Image.propTypes = {
//   show: types.function,
//   index: types.number
// }


// Method 2
Image.propTypes = {
  show: PropTypes.func,
  index: PropTypes.number,
  image: PropTypes.string,
  handleRemove: PropTypes.func,
}








export default Image;
