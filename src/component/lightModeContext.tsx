// A context Provider that provides Object, that holds {a state and a Method}
import React, { createContext, useState } from "react"

// a constant variable that represents inital value
const initalLightModeContextValue = {
    lightMode: false,
    toogleLightMode: () => { } // we can and cannot wright its logic any where. As it is not concret to overide it, as in Interfaces(of Java)
}
// A context object that represents {Object and its paramaters} with its datatypes defined
// <{definition of object}>(inital Value of object)
const LightModeContext = createContext<{
    lightMode: boolean;             // variable of boolean datatype
    toogleLightMode: () => void;    // function with no arguments, no return
}>(initalLightModeContextValue);

// TypeScript type definition
// It specifies that the component expects a prop called children with a type of React.ReactNode.
type Props = {
    children: React.ReactNode
}

// { children }: Props
// This specifies that children prop should be of type React.ReactNode, 
// a type that can represent any valid React node, such as JSX elements, strings, or fragments.

// By defining the Props type, 
// it provides a way to enforce type checking and 
// ensure that the LightModeProvider component is used correctly by requiring the children prop to be provided with the expected type.
function LightModeProvider({ children }: Props) {
    const [lightMode, setLightMode] = useState<boolean>(() => false); //Managing State
    const toogleLightMode = () => { //Defining the Toggle Function
        setLightMode(prevLightMode => !prevLightMode);
    }

    return (
        <div>
            <LightModeContext.Provider value={{ lightMode, toogleLightMode }}>
                {children}
            </LightModeContext.Provider>
        </div>
    )
}

export { LightModeContext, LightModeProvider };


// In summary, 

// this code sets up a context called LightModeContext 
// that provides a lightMode state and a toggleLightMode function to its descendants.

// The LightModeProvider component manages the state and provides it to its child components.
// Other components can import the LightModeContext 
// and use its values to implement light / dark mode functionality in a React application.

// Further it can be used using useContext()




