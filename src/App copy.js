import React, {useState, useEffect, useRef} from "react";
import Images from "./components/Images";
import "./assets/style.css";

function App() {
  const [title, setTitle] = useState("Hello RRReact");
  const [isShowing, setIsShowing] = useState(false);
  const [didMount, setdidMount] = useState(false)

  const mountRef = useRef(false)

// Component Did mount only
  useEffect(() => {
    setdidMount(true)
    console.log('App Mounted hooks');
  }, [])


  // Component Will Update
  useEffect(() => {

    if (mountRef.current) {
      console.log('App Updated');
    } else { 
      mountRef.current = true
    }
  }, [isShowing])




  function handleClick() {
    setIsShowing(!isShowing)
  };

  return (
    <section className="flex justify-center">
      <div className="w-10/12">
        <div className="text-center">
          <div className="my-4">{title}</div>

          <Images />
          {/* <button
            onClick={handleClick}
            className="p-2 bg-blue-600 text-white mb-2"
          >
            Toggle Image
          </button>

          {isShowing ? <Images /> : null} */}
        </div>
      </div>
    </section>
  );
}

// class App extends React.Component {
//   constructor(props) {
//     console.log('helllooo');
//     super(props);

//     this.state = { title: "helooo React 2", isShowing: false };
//   }

//   // States are Immutable

//   componentDidMount() {
//     console.log('mounted');
//     this.setState({title : 'Hello LifeCycle'})
//   }

//   componentDidUpdate() {
//     console.log("App Updated");
//   }

//   handleClick =  () => {
//     this.setState({isShowing: !this.state.isShowing})
//   }

//   render() {
//     console.log('render app');

//     return (
//       <section className="flex justify-center">
//         <div className="w-1/2">
//           <div className="text-center">
//             <div className="my-4">{this.state.title}</div>
//             <button
//               onClick={this.handleClick}
//               className="p-2 bg-blue-600 text-white mb-2"
//             >
//               Toggle Image
//             </button>

//             {this.state.isShowing ? (
//               <Images />
//             ) : null}
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

export default App;
