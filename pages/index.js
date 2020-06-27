import { Col, Icon, List, Row } from 'antd'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import servicePath from '../config/api'
import Author from '../pages/api/Author'
import Footer from '../pages/api/Footer'
import Header from '../pages/api/Header'
import '../public/style/components/author.css'
import '../public/style/components/footer.css'
import '../public/style/pages/comm.css'
import '../public/style/pages/index.css'
import DynamicTest from './api/dynamictest'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const Home = (list) => {
    const [mylist, setMylist] = useState(list.results)

    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        sanitize: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }

    });

    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <script src="../pages/test.js"></script>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <List
                        header={<div className="header-css">博客</div>}
                        itemLayout="vertical"
                        dataSource={mylist}
                        renderItem={item => (
                            <List.Item >
                                <div>
                                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                                        <a className="list-title">{item.title}</a>
                                    </Link>
                                </div>
                                <div className="list-icon">
                                    <span><Icon type="calendar" /> {item.created}</span>
                                    <span><Icon type="folder" />文章</span>
                                    <span><Icon type="fire" /> {item.total_views}</span>
                                </div>
                                <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.brief) }}></div>
                            </List.Item>
                        )}
                    />
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    {/* <Advter /> */}
                </Col>
            </Row>
            <Footer />
            <DynamicTest />
        </div>
    )
}

Home.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
        axios(servicePath.articlelist).then(
            (res) => {
                resolve(res.data)
            })
    })

    return await promise
}

export default Home