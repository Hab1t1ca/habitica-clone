import axios from 'axios';

function userName(name){
    let body = {"name": name};
    axios.post('/api/createChar', body).then(
        res=>{
            return res.data;
        }
    )
}