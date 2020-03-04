import React from 'react';
import InfoForm from './form';
import InfoTable from './table';
import axios from "axios";

class App extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
             data : [],
             editData : []
        }
    }

    create = data => {
        if(!data.isEdit){
            axios
            .post("http://localhost:5000/info/", data)
            .then(res => this.getAll() )
            .catch(err => console.error(err));
        }
        else{
            axios
            .put("http://localhost:5000/info/update", data)
            .then(res => this.getAll() )
            .catch(err => console.error(err));
        }
    }

    componentDidMount() {
        this.getAll();
    }

   getAll(){
        axios
          .get("http://localhost:5000/info/")
          .then(res => {
            this.setState({
                data : res.data
            })
          })
          .catch(err => console.error(err));
    }

    update = data => {
        this.setState({
            editData : data
        })
    }

    myDel = data => {
        var options = window.confirm(`Are you sure to delete ${data.Name}?`)
        if(options){
            axios
          .delete(`http://localhost:5000/info/del/${data._id}`)
          .then(res => {
            this.getAll();
          })
          .catch(err => console.error(err));
        }
    }

    render(){
        return (
            <div className="container mt-5">
            <div className="row">
                <div className="col-6">
                    <InfoForm myData={this.create} setForm = {this.state.editData}/>
                </div>
                <div className="col-6">
                    <InfoTable getData={this.state.data} setData={this.update} del={this.myDel}/>
                </div>
            </div>
        </div>
        );
    }
}

export default App;