import React, { Component } from 'react';
import Nav from '../nav/nav';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'material-ui/Slider';
import './dashboard.css';
import stickman from './stickmanTemplate.png';
import { connect } from 'react-redux';
import { createChar, addClass, createAvatar } from '../../ducks/reducer';
import Dailies from '../lists/Dailies';
import Todos from '../lists/Todos';


const CLOUDINARY_UPLOAD_PRESET = 'zj5sgnrc';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/rigrater/image/upload';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            firstModal: false,
            name: '',
            secondModal: false,
            thirdModal: false,
            class: '',

            uploadedFileCloudinaryUrl: '',
            image: null,
            preview: null,
            
            scaleSlider: 1.8
        }
        this.onClickSave = this.onClickSave.bind(this);
    }


    onClickSave = () => {
        if (this.editor) {
          // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
          // drawn on another canvas, or added to the DOM.
          const canvas = this.editor.getImage()
         const picture = this.editor.getImageScaledToCanvas().toDataURL('image/jpeg', 1);
          
          // If you want the image resized to the canvas size (also a HTMLCanvasElement)
        //   const canvas = this.editor.getImageScaledToCanvas()
        //   const picture = canvas.toDataURL('image/jpeg', 1.0)
        

          console.log(canvas, "Cool")
          console.log(picture, "Cool")
          this.handleImageUpload(picture)
          this.setState({
            preview: picture
          })
        //   console.log(canvasScaled, "CoolScaled")
        //   console.log(picture)

        }
      }

      setEditorRef = (editor) => this.editor = editor
      

    handleScaleSlider = (event, value) => {
        this.setState({scaleSlider: value});
      };

    onImageDrop(files) {
        this.setState({
          uploadedFile: files[0],
          image: files[0]
        });

      }

      handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url
            });
          }
        });
      }



    handleName(string) {
        this.setState({
            name: string
        })
    }

    openFirstModal() {
        this.setState({
            firstModal: true
        })
    }

    submitUserName() {
        this.setState({
            firstModal: false,
            secondModal: true
        })
        //query to DB
    }


    class(field) {

        this.props.addClass(field)

        this.setState({
            secondModal: false,
            thirdModal: true
        })
    }

    moveOn(){
        createChar(this.state.name);
        this.setState({
            firstModal: false,
            secondModal: true
        })

    }

    moveOn2(){
        createAvatar(this.state.uploadedFileCloudinaryUrl);
        this.setState({
           thirdModal: false
        })

    }

    render() {
        let createChar = this.props.createChar;
        let createAvatar = this.props.createAvatar;

        console.log(this.state.class)
        return (
            <div className="backgroundDashboard">
                <Nav />

                <button onClick={e => this.openFirstModal()}>Open Modal - test</button>

                <Dailies/>
                <Todos/>

                {/* <UserIcon/> */}

                {/* first modal */}
                <Dialog
                    title="Welcome to Stick To It!"
                    open={this.state.firstModal}
                    modal={true}
                    paperProps={{
                        style: { borderRadius: '0px',
                                width: '100%',
                                border: '1px solid white',
                                 }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", borderRadius: '25px', background: '#3D315B', }}
                >
                    <p>Please call your stick person something. We don't care what. Just stick it in the box.</p>
                    <input placeholder="Name thing goes here" onChange={e => this.handleName(e.target.value)} className="inputModal"/>
                    <br/>
                    <button onClick={() => this.moveOn()} className="buttonModal">Submit</button>
                </Dialog>
                {/* second modal */}
                <Dialog
                    title="Choose a character class:"
                    open={this.state.secondModal}
                    modal={true}
                    paperProps={{
                        style: { borderRadius: '25px' }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", borderRadius: '25px', background: '#3D315B' }}
                >

                    <div onClick={this.class.bind(this, 'mage')}>Mage</div>
                    <div onClick={this.class.bind(this, 'rogue')}>Rogue</div>
                    <div onClick={this.class.bind(this, 'warrior')}>Warrior</div>
                </Dialog>
                {/* third modal */}
                <Dialog
                    title="Choose a sexy bod..."
                    open={this.state.thirdModal}
                    modal={true}
                    autoScrollBodyContent={true}
                    paperProps={{
                        style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", background: '#3D315B'}}
                >
                    <p>...or upload your face.</p>

                <div className="outerDropzone">
                    <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop.bind(this)}
                        className="dropzone">
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                </div>
      <AvatarEditor
        ref={this.setEditorRef}
        image={this.state.image}
        width={150}
        height={150}
        border={200}
        borderRadius={200}
        color={[61, 49, 91, 0.3]} // RGBA
        scale={this.state.scaleSlider}
        rotate={0}
        style={ {width: '200px', height: '200px', border: '1px solid #3D315B'} }
      />

<Slider
          min={0.1}
          max={4.5}
          step={.1}
          value={this.state.scaleSlider}
          onChange={this.handleScaleSlider}
          sliderStyle={{ trackColor: '#3D315B', selectionColor: '#3D315B'}}
        />

                    
        <button onClick={() => this.onClickSave()} className="buttonModal">Crop</button>
                    
                <div className={!this.state.uploadedFileCloudinaryUrl ? "stickmanClosed" : "stickmanOpen"}>
                    <br/>
                    <img src={this.state.uploadedFileCloudinaryUrl} className= "previewWindow"/>
                    <br/>
                    <img src={stickman} className="stickman"/>
                </div>

            <br/>

        <button onClick={() => this.moveOn2()} className="buttonModal">Submit</button>
                    
                
                
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        name: state.name
    }
}
export default connect(mapStateToProps, { createChar, addClass, createAvatar })(Dashboard)