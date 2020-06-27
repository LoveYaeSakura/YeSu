import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import Header from '../pages/api/Header'
import Author from '../pages/api/Author'
import Advter from '../pages/api/Advert'
import Footer from '../pages/api/Footer'
import '../public/style/pages/Detailed.css'
import 'markdown-navbar/dist/navbar.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../public/style/components/tocify.tsx'
import servicePath from '../config/api'

const Detailed = (props) => {
    const tocify = new Tocify()
    const renderer = new marked.Renderer();

    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level)
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    }

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        },
    });

    let html = marked(props.content)

    return (
        <div>
            <Head>
                <title>Detailed</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item><a href="/">列表</a></Breadcrumb.Item>
                                <Breadcrumb.Item><a href="/">{props.title}</a></Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>

                            <div className="detailed-title">
                                {props.title}
                            </div>
                            <div className="list-icon center">
                                <span><Icon type="calendar" />{props.create}</span>
                                <span><Icon type="folder" />博客</span>
                                <span><Icon type="fire" />{props.total_views}</span>
                            </div>
                            <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}></div>
                        </div>
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    {/* <Advter /> */}
                    <Affix offsetTop={5}>
                        <div className="detailed-nav">
                            <div className="nav-title">文章目录</div>
                            {tocify && tocify.render()}
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}

Detailed.getInitialProps = async (context) => {
    console.log(context.query.id)

    let id = context.query.id

    const promise = new Promise((resolve) => {
        axios(servicePath.articlelist + id).then(
            (res) => {
                resolve(res.data)
            }
        )
    })
    return promise
}


export default Detailed