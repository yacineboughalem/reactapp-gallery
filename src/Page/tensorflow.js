import React, { useEffect, useRef, useState } from 'react'
import "@tensorflow/tfjs"
import * as mobilenet from '@tensorflow-models/mobilenet'
import useTFClassify from '../utils/hooks/useTFClassify'

export default function Tensorflow() {

    const imageRef = useRef()

    const { predict, predictions, isLoading } = useTFClassify()

    return (
        <div className="flex justify-center">
            <div className="w-1/3">
                <h1>ddk</h1>

                <img
                    crossOrigin={"anonymous"}
                    src="https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE3ODA1MX0"
                    ref={imageRef} width={400} />

                <div className="text-center my-5">

                    {predictions.length > 0 &&
                        <div className="pb-6 text-left">
                            {
                                predictions.map(prediction => (
                                    <div className="flex justify-between">
                                        <p>{prediction.className}</p>
                                        <p>{Math.floor(prediction.probability * 100)} %</p>
                                    </div>

                                ))
                            }
                        </div>
                    }

                    <button
                        onClick={() => predict(imageRef.current)}
                        className="p-2 w-64 rounded bg-gray-900 text-white"
                    >

                        {isLoading && <span>⏳</span>}
                        {!isLoading && <span>Predict Result</span>}



                    </button>
                </div>
            </div>
        </div>
    )
}
