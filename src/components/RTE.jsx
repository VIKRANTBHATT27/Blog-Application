import React from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue="" }) {

  return (
    <div className='w-full'>
      { label && <label className='inline-block mb-1 pl-1'>{label}</label> }  
      
      <Controller
        name={name || "content"}
        control={control}   //the control of this Controller element is been given while calling the RTE Component Function
        render={ ({ field: {onChange} }) => (

          <Editor 
            apiKey='rm274my368rmgh7r9mn6h0afceuxf5g4agwm0b8s741cut0s'
            initialValue={defaultValue}
            init={
              {
                initialValue: defaultValue,
                branding: false,
                height: 500,
                menubar: true,
                plugins: [
                  'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak', 'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'emoticons', 'help',
                ],
                toolbar: "undo redo | styles | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | outdent indent | blocks | image | bullist numlist outdent indent | removeformat | help",
                content_style: "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }"
              }
            }

            onEditorChange={onChange}
          />

        ) }
      />

    </div>
  )
}

