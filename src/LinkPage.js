import { useState, useEffect } from 'react';
import { getUser } from './service/AuthService';
import Stack from '@mui/material/Stack';
import axios from "axios";

function App() {
    const user = getUser();
    const apiLink = 'https://u5bfuffgq6.execute-api.eu-north-1.amazonaws.com/production/getlinkdata';
    const [userLinkData, SetUserLinkData] = useState();
    //const linkAmount = []
    const arr = [];

    for (let i = 1; i <= 20; i++) {
        /*  */
        const indicator = "link" + i
        console.log(indicator)
        try {
            console.log(JSON.stringify(userLinkData[indicator].link))
            const url = "https://" + userLinkData[indicator].link
            arr.push(
                <a href={url} className="btn btn-light mb-2 linkpage-btn">{userLinkData[indicator].linkTitle}</a>
            );
            console.log(arr);
        }
        catch(err) {
            break;
        }
    }

    useEffect(() => {
        const reqBody = {
            username : user.username
        }
        const dataRes = async () =>
          await axios.post(apiLink, reqBody).then(response => {
            console.log(response);
            const linkDatas = response.data.linkData;
            if (linkDatas === undefined || !linkDatas) {
                console.log("error gan gaada linkdata");
                return null;
            } else {
                SetUserLinkData(JSON.parse(JSON.stringify(linkDatas)))
                
            }
          }).catch(err => {
            console.log(err);
          });
        dataRes();
    }, []);

    const addFields = () => {
        
    }

    








    return (
        <div className="App container text-center justify-content-center align-items-center mt-5 text-white">
            <img src={user.profilePic} className="img-thumbnail linkpage-items" alt="..."></img>
            <h3 className=" linkpage-items">{user.name}</h3>
            <h3 className=" linkpage-items"></h3>
            <Stack direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={2}>
            {arr}
            </Stack>
            

        </div>
    );
}

export default App;