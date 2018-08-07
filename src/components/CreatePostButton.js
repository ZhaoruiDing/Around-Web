import React from 'react';
import { Modal, Button, message} from 'antd';
import $ from 'jquery';
import {WrappedCreatePostForm} from "./CreatePostForm";
import {API_ROOT, AUTH_PREFIX, POS_KEY, TOKEN_KEY} from "../constants"

export class CreatePostButton extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

    handleOk = () => {
      this.setState({confirmLoading: true});
      this.form.validateFields((err, values) => {
        if (!err) {
          const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
          const formData = new FormData();
          formData.set('lat', lat);
          formData.set('lon', lon);
          formData.set('message', values.message);
          formData.set('image', values.image[0].originFileObj);
          $.ajax({
            url: `${API_ROOT}/post`,
            method: 'POST',
            data: formData,
            headers: {
              Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            },
            processData: false,
            contentType: false,
            dataType: 'text',

          }).then((response) => {
            message.success('success!');
            this.form.resetFields();
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            this.props.loadNearByPosts();
          }, (response) => {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            message.error(response.responseText);
          }).catch((error) => {
            console.log(error);
          });
        }
      });
    }
    handleCancel = () => {
      console.log('Clicked cancel button');
      this.setState({
        visible: false,
      });
    }
    saveFormRef = (form) => {
      this.form = form;
    }
    /*
    JS feature, I don't need to predefine the this.form. When I use this form,
    it will automatically define a form field in the class.
    */
    render(){
      const {visible, confirmLoading} = this.state;
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>Create New Post</Button>
          <Modal title="Create New Post"
                 visible={visible}
                 onOk={this.handleOk}
                 confirmLoading={confirmLoading}
                 onCancel={this.handleCancel}
                 okText="Create"
                 cancelText="Cancel"
          >
            <WrappedCreatePostForm ref={this.saveFormRef}/>
          </Modal>
        </div>
      );
    }
}