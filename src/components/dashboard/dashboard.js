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
import { createChar, addClass } from '../../ducks/reducer';
import Dailies from "../lists/Dailies";
import Todos from "../lists/Todos";
// import UserIcon from '../userIcon/UserIcon';


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

    render() {
        let createChar = this.props.createChar;

        console.log(this.state.class)
        return (
            <div className="backgroundDashboard">
                <Nav />

                <button onClick={e => this.openFirstModal()}>Open Modal - test</button>

                <h1>Dashboard</h1>
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
                        style: { borderRadius: '25px' }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", borderRadius: '25px' }}
                >
                    <p>Please call your stick person something. We don't care what. Just stick it in the box.</p>
                    <input placeholder="Name thing goes here" onChange={e => this.handleName(e.target.value)} />
                    <button onClick={() => this.moveOn()}>Submit</button>
                </Dialog>
                {/* second modal */}
                <Dialog
                    title="Choose a character class:"
                    open={this.state.secondModal}
                    modal={true}
                    paperProps={{
                        style: { borderRadius: '25px' }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", borderRadius: '25px' }}
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
                        style: { borderRadius: '25px' }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", borderRadius: '25px' }}
                >
                    <p>...or upload your face.</p>

                    <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop.bind(this)}>
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>

      <AvatarEditor
        ref={this.setEditorRef}
        image={this.state.image}
        width={150}
        height={150}
        border={200}
        borderRadius={200}
        color={[66, 244, 69, 0.3]} // RGBA
        scale={this.state.scaleSlider}
        rotate={0}
      />

<Slider
          min={0.1}
          max={4.5}
          step={.1}
          value={this.state.scaleSlider}
          onChange={this.handleScaleSlider}
        />

        <button onClick={() => this.onClickSave()}>Crop</button>
                    
                    <br/>
                    <img src={this.state.uploadedFileCloudinaryUrl} className="previewWindow"/>
                    <br/>
                    <img src={stickman} className="stickman"/>

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
export default connect(mapStateToProps, { createChar, addClass })(Dashboard)