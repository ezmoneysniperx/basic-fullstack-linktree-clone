import { useState } from 'react';
import { getUser } from './service/AuthService';
import axios from "axios";

function App() {
  const [formFields, setFormFields] = useState([
    { linkTitle: '', link: '' },
  ])

  const user = getUser();
  const defaultUsername = user.username;

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    var jsonObj = {
      linkName: defaultUsername
    };
    for (var i = 0; i < formFields.length; i++) {
      jsonObj["link" + (i + 1)] = formFields[i];
    }
    console.log(JSON.stringify(jsonObj))

    const linkUrl = 'https://u5bfuffgq6.execute-api.eu-north-1.amazonaws.com/production/uploadlink'

    axios.post(linkUrl, jsonObj).then(response => {
      alert("Başarılı");
    }).catch(err => {
      if (err.response.status === 401) {
        alert("Bilgiler kaydedilirken bir hata oluştu");
      } else {
        alert("Bilgiler kaydedilirken bir hata oluştu");
      }
    });
  }

  const addFields = () => {
    let object = {
      linkTitle: '',
      link: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className="App container text-center justify-content-center align-items-center mt-5 text-white">
      <h3>Add Links to Your Profile Page</h3>
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div className="input-group w-50 mx-auto mb-1" key={index}>
              <input
                name='linkTitle'
                placeholder='Link Title'
                onChange={event => handleFormChange(event, index)}
                value={form.linkTitle}
                className="form-control"
              />
              <input
                name='link'
                placeholder='Link'
                onChange={event => handleFormChange(event, index)}
                value={form.link}
                className="form-control"
              />
              <button className="btn btn-danger" onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
      </form>
      <button className="btn btn-primary mb-2" onClick={addFields}>Add More..</button>
      <br />
      <button className="btn btn-success" onClick={submit}>Submit</button>
    </div>
  );
}

export default App;