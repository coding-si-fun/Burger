import React from "react"
import Modal from "../../components/UI/Modal/Modal"
import Aux from "../_Aux/_Aux"



const withErrorHandler = (WrappedComponent: JSX.IntrinsicAttributes, axios: { interceptors: { request: { use: (arg0: (req: object) => object) => number; eject: (arg0: number) => void }; response: { use: (arg0: (res: object) => object, arg1: (error: object) => void) => number; eject: (arg0: number) => void } } }) => {

    return class extends React.Component{
       
        state = {
            error: null
        }
        reqInterceptor!: number;
        resInterceptor!:number;
        show!: null | boolean 

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use((req:object) =>
                {
                    console.log("this is req", typeof this.reqInterceptor)
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use((res:object)=> res, (error: object) => {
                console.log("this is res")
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
         
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                                    
                    </>                
                    </Aux>
            );
        }
    }
}

export default withErrorHandler;