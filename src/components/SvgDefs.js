import React from "react"

const SvgDefs = () => {
  return (
    <div>
      <svg
        style={{
          display: "none",
          width: "0",
          height: "0",
        }}
      >
        <defs>
          <symbol id="arrow-prev" viewBox="0 0 184.975 368.519">
            <polyline
              className="arrow-line"
              points="184.249,368.165 0.354,184.269 184.268,0.354 "
            />
          </symbol>

          <symbol id="arrow-next" viewBox="0 0 184.975 368.519">
            <polyline
              className="arrow-line"
              points="0.372,368.165 184.268,184.269 0.354,0.354 "
            />
          </symbol>

          <symbol id="arrow-up" viewBox="0 0 368.519 184.975">
            <polyline
              className="arrow-line"
              points="0.353,184.249 184.25,0.354 368.165,184.268 "
            />
          </symbol>

          <symbol id="arrow-down" viewBox="0 0 368.519 184.975">
            <polyline
              className="arrow-line"
              points="368.166,0.372 184.269,184.268 0.354,0.354 "
            />
          </symbol>

          <symbol id="icon-close" viewBox="0 0 1024 1024">
            <title>close</title>
            <path
              className="path1"
              d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
            ></path>
          </symbol>

          <symbol id="icon-menu" viewBox="0 0 1024 1024">
            <title>menu</title>
            <path
              className="path1"
              d="M256 640h512v128h-512zM256 448h512v128h-512zM960 0h-896c-35.376 0-64 28.624-64 64v896c0 35.376 28.624 64 64 64h896c35.376 0 64-28.624 64-64v-896c0-35.376-28.624-64-64-64zM896 896h-768v-768h768v768zM256 256h512v128h-512z"
            ></path>
          </symbol>

          <symbol id="icon-target" viewBox="0 0 1024 1024">
            <title>target</title>
            <path
              className="path1"
              d="M576.736 447.2h185.248c-23.488-90.752-94.496-161.824-185.248-185.248v185.248zM576.736 576.8v185.184c90.752-23.36 161.76-94.496 185.248-185.184h-185.248zM447.136 447.2v-185.248c-90.752 23.424-161.888 94.496-185.248 185.248h185.248zM447.136 576.8h-185.248c23.36 90.688 94.496 161.824 185.248 185.184v-185.184zM576.736 129.696c162.368 27.488 289.984 155.136 317.504 317.504h129.76c-29.632-233.952-213.248-417.632-447.264-447.2v129.696zM129.632 447.2c27.488-162.4 155.104-290.016 317.504-317.504v-129.696c-233.888 29.568-417.632 213.248-447.136 447.2h129.632zM447.136 894.24c-162.368-27.488-289.984-155.008-317.504-317.44h-129.632c29.504 233.952 213.248 417.696 447.136 447.2v-129.76zM894.24 576.8c-27.488 162.432-155.136 289.952-317.504 317.44v129.76c234.016-29.504 417.632-213.248 447.264-447.2h-129.76z"
            ></path>
          </symbol>
        </defs>
      </svg>
    </div>
  )
}

export default SvgDefs
