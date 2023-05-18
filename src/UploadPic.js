import React, { Component } from "react";
import axios from "axios";
import { getUser } from './service/AuthService';

export default class FileUpload extends Component {

    state = {
        fileToUpload: undefined,
        uploadSuccess: undefined,
        error: undefined
    };

    uploadFile() {
        const user = getUser();
        const defaultName = user.username;
        axios(
            "https://u5bfuffgq6.execute-api.eu-north-1.amazonaws.com/production/upload?fileName=" +
            this.state.fileToUpload.name
        ).then(response => {
            const url = response.data.fileUploadURL;
            console.log(this.state.fileToUpload.name);

            axios({
                method: "PUT",
                url: url,
                data: this.state.fileToUpload,
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(res => {
                    const profileLink = "https://linktree-clone-bucket.s3-eu-north-1.amazonaws.com/" + this.state.fileToUpload.name;
                    const updateInfoUrl = 'https://u5bfuffgq6.execute-api.eu-north-1.amazonaws.com/production/updateprofilepic';
                    console.log(profileLink);
                    // this.setState({
                    //     uploadSuccess: "File upload successfull",
                    //     error: undefined
                    // });
                    axios.post(updateInfoUrl, {
                        username: defaultName,
                        link: profileLink
                    }).then(response => {
                        this.setState({
                            uploadSuccess: "File upload successfull",
                            error: undefined
                        });
                    }).catch(err => {
                        if (err.response.status === 401) {
                            this.setState({
                                error: "Error 401 Occured while uploading the file",
                                uploadSuccess: undefined
                            });
                        } else {
                            this.setState({
                                error: "Error Occured while uploading the file",
                                uploadSuccess: undefined
                            });
                        }
                    });
                })
                .catch(err => {
                    this.setState({
                        error: "Error Occured while uploading the file",
                        uploadSuccess: undefined
                    });
                });
        });
    }

    render() {
        return (
            <div className="fileUploadCont">
                <div className="headerUpload">
                    Upload New Profile Picture
                </div>
                <div>
                    <form>
                        <div className="mb-3 mt-3">
                            <input
                                type="file"
                                className="form-control-file"
                                id="fileUpload"
                                onChange={e => {
                                    this.setState({
                                        fileToUpload: e.target.files[0]
                                    });
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            {this.state.fileToUpload ? (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={e => {
                                        this.uploadFile();
                                    }}
                                >
                                    Upload
                                </button>
                            ) : null}
                        </div>
                        <div className="mb-1">
                            <span>
                                {this.state.uploadSuccess
                                    ? "File Upload Successfully"
                                    : ""}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}