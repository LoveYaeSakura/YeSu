import { Avatar, Divider } from 'antd'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="http://images.ali213.net/picfile/pic/2017/10/23/927_2017102362126799.jpg" /></div>
            <div className="author-introduction">
                哈哈哈
                 <Divider>联系我</Divider>
                <a href="https://github.com/LoveYaeSakura"><Avatar size={28} icon="github" className="account" /></a>

                <Avatar size={28} icon="qq" className="account" />
                <Avatar size={28} icon="wechat" className="account" />
            </div>
        </div>
    )
}

export default Author