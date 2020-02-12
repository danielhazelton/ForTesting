class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date(), hidden: false };
        this.toggleHidden = this.toggleHidden.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.updateTime(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateTime() {
        this.setState({
            date: new Date()
        });
    }

    toggleHidden() {
        this.setState( state => ({ hidden: !state.hidden })); 
    }

    render() {
        let body;

        body = (
            <div>
                <div>
                    <h2>{this.state.date.toLocaleTimeString()}</h2>
                </div>
            </div>
        );

        return (
            <React.Fragment>
                {body}
            </React.Fragment>
        );
    }
}

class TemperatureDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {temperature: this.props.temperature, tempUnit: this.props.tempUnit };
        this.toggleUnit = this.toggleUnit.bind(this);
        this.increaseTemp = this.increaseTemp.bind(this);
        this.decreaseTemp = this.decreaseTemp.bind(this);
    }

    convertToC( faren ) {
        faren = Number(faren)
        return String(Math.floor((faren - 32) * 5 / 9 ));
    }

    convertToF( cel ) {
        cel = Number(cel)
        return String(Math.floor( ( cel / (5/9)) + 32 ));
    }

    toggleUnit(){
        if (this.state.tempUnit == 'C'){
            this.setState( state => ({
                tempUnit: 'F',
                temperature: (this.convertToF(this.state.temperature))
                }) 
            );
            
        }
        else {
            this.setState( state => ({
                tempUnit: 'C',
                temperature: (this.convertToC(this.state.temperature))
                }) 
            );
        }
    }

    increaseTemp() {
        if ( ( this.state.tempUnit == 'F' && this.state.temperature < 80 ) || ( this.state.tempUnit == 'C' && this.state.temperature < 26 )){
            this.setState( state => ({
                temperature: String(Number(this.state.temperature) + 1)
            })
            );
        }
    }

    decreaseTemp() {
        if ( ( this.state.tempUnit == 'F' && this.state.temperature > 50 ) || ( this.state.tempUnit == 'C' && this.state.temperature > 10 ) ){
            this.setState( state => ({
                temperature: String(Number(this.state.temperature) - 1)
            })
            );
        }
    }

    render(){
        
        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" , alignItems: "center" }}>
                        <h2>{this.state.temperature}°</h2>
                        <div style={{ display: "flex", flexDirection: "column"}}>
                            <button className="btn" onClick={this.increaseTemp}  >
                                <i className="fa fa-arrow-up" aria-hidden="true"></i>
                            </button>  
                            <button className="btn" onClick={this.decreaseTemp} >
                                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                            </button>  
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" , alignItems: "center" }}>
                        <button className="btn" onClick={this.toggleUnit}>
                            <i className={"fa " + (this.state.tempUnit == 'C' ? "fa-toggle-on" : "fa-toggle-off") } aria-hidden="true"></i>
                        </button>  
                        <div style={{ marginLeft: "20px"}}>°{this.state.tempUnit}</div>  
                    </div>
                </div>
            
            </div>     
        );
    }

}

class Thermostat extends React.Component {

    constructor(props){
        super(props); 
    }

    render(){
        console.log("LMAO");
        return (
            <div >
                <div className="jumbotron" style={{width: "250px", margin: "0 auto" }}>
                    <Clock/>
                    <TemperatureDisplay temperature={this.props.temperature} tempUnit={this.props.tempUnit}/>
                </div>
            </div>
        );
    }

}

ReactDOM.render(
    <Thermostat temperature="68" tempUnit="F"/>,
    document.getElementById('root')
);
