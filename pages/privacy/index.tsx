import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import { NextJSContext } from '../../server/interface/base.interface'

const style = {
  width: '100%'
}

class PrivacyPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="法律声明及隐私权政策">
        <div style={{ background: '#fff', padding: '40px 0' }}>
          <div className="container">
            <h1 className="text-cn">法律声明及隐私权政策</h1>
            <h2>提示条款：</h2>
            <p>
              您的信任对我们非常重要，我们深知个人信息对您的重要性，我们将按法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。鉴此，钱趣多服务提供者(或简称“我们”)制定本《法律声明及隐私权政策》(下称“本政策
              /本隐私权政策”)并提醒您：
            </p>
            <p>本政策适用于钱趣多产品或服务。</p>
            <p>
              需要特别说明的是，本政策不适用于其他第三方向您提供的服务，也不适用于钱趣多中已另行独立设置法律声明及隐私权政策的产品或服务。例如第三方支付机构向您提供线上支付服务时。
            </p>
            <p>
              在使用钱趣多各项产品或服务前，请您务必仔细阅读并透彻理解本政策，在确认充分理解并同意后使用相关产品或服务。一旦您开始使用钱趣多各项产品或服务，即表示您已充分理解并同意本政策。如对本政策内容有任何疑问、意见或建议，您可通过钱趣多提供的各种联系方式(www.qianquduo.com)与我们联系。
            </p>
            <h2>第一部分 定义</h2>
            <p>
              钱趣多：指钱趣多(域名为 qianquduo.com)网站。
              <br />
              钱趣多服务提供者：指钱趣多的网络借贷信息中介服务提供者上海钱橙互联网金融信息服务有限公司。
              个人信息：指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。
              <br />
              个人敏感信息：包括身份证件号码、个人生物识别信息、银行账号、财产信息、行踪轨迹、交易信息、14岁以下(含)儿童的个人信息等。
              <br />
              个人信息删除：指在实现日常业务功能所涉及的系统中去除个人信息的行为，使其保持不可被检索、访问的状态。
              <br />
              最近更新日期: 2018年3月.
              <br />
              如果您有任何疑问,意见或建议,请通过以下联系方式与我们联系:
              <br />
              电子邮件: qianquduokefu@qcfinancial.cn
              <br />
              电话: 400-656-8877
            </p>
            <h2>第二部分 法律声明</h2>
            <h3>权利归属</h3>
            <p>
              除非钱趣多另行声明，钱趣多内的所有产品、技术、软件、程序、数据及其他信息(包括文字、图标、图片、照片、音频、视频、图表、色彩组合、版面设计等)的所有权利(包括版权、商标权、专利权、商业秘密及其他相关权利)均归钱趣多服务提供者所有。未经钱趣多服务提供者许可，任何人不得以包括通过机器人、蜘蛛等程序或设备监视、复制、传播、展示、镜像、上载、下载等方式擅自使用钱趣多内的任何内容。
            </p>
            <p>
              钱趣多的文字及/或标识，以及钱趣多的其他标识、徽记、产品和服务名称均为钱趣多服务提供者在中国和其他国家的商标，如有宣传、展示等任何使用需要，您必须取得钱趣多服务提供者事先书面授权。
            </p>
            <h3>责任限制</h3>
            <p>
              鉴于钱趣多提供的信息发布服务属于网络借贷信息中介性质，钱趣多上的产品信息(包括但不限于出借人信息，借款人信息，借款人车辆信息、借款人房屋信息等)由用户自行提供并上传，由用户对其提供并上传的信息承担相应法律责任。钱趣多服务提供者对此另有约定的，将在相关的协议或其他法律文本中与您进行明确。
            </p>
            <p>
              钱趣多转载的作品(包括论坛内容)出于传递更多信息之目的，并不意味我们赞同其观点或已经证实其内容的真实性。
            </p>
            <h3>知识产权保护</h3>
            <p>
              我们尊重知识产权，反对并打击侵犯知识产权的行为。知识产权权利人若认为钱趣多内容(包括但不限于钱趣多用户发布的商品信息)侵犯其合法权益的，可以通过(www.qianquduo.com)进行投诉，我们将在收到知识产权权利人合格通知后依据相应的法律法规以及平台规则及时处理。
            </p>
            <h2>第三部分 隐私权政策</h2>
            <p>
              1、我们如何收集和使用您的个人信息
              <br />
              2、我们如何使用Cookie和同类技术
              <br />
              3、我们如何共享、转让、公开披露您的个人信息
              <br />
              4、我们如何保护您的个人信息
              <br />
              5、您的权利
              <br />
              6、我们如何处理儿童的个人信息
              <br />
              7、您的个人信息如何在全球范围转移
              <br />
              8、本政策何更新
              <br />
              9、如何联系我们
              <br />
              我们深知个人信息对您的重要性,并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任,恪守以下原则,保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺,我们将按业界成熟的安全标准,采取相应的安全保护措施来保护您的个人信息。
              <br />
              请在使用我们的产品(或服务)前,仔细阅读并了解本《隐私政策》。
            </p>
            <h3>一、我们如何收集和使用您的个人信息</h3>
            <p>
              个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。
              <br />
              我们仅会出于本政策所述的以下目的,收集和使用您的个人信息:
            </p>
            <h4>(一)帮助您成为我们的会员</h4>
            <p>
              为成为我们的会员，以便我们为您提供会员服务，您需要提供:手机号，并创建昵称、用户名和密码。如果您仅需使用浏览、搜索等基本服务，您不需要注册成为我们的会员及提供上述信息。
              <br />
              在注册过程中,如果您提供以下额外信息,将有助于我们给您提供更好的服务和体验：居住地、最高学历、毕业院校、婚姻状况、子女状况、收入状况、社保、住房、是否有车。但如果您不提供这些信息，将不会影响使用浏览、搜索等基本功能。
              <br />
              您提供的上述信息,将在您使用本服务期间持续授权我们使用。在您主动注销账号时，我们将根据适用法律法规的要求尽快使其匿名或删除您的个人信息。
              <br />
              上述信息将存储于中华人民共和国境内。如需跨境传输,我们将会单独征得您的授权同意。
            </p>
            <h4>(二)为您展示和推送网络借贷产品或服务</h4>
            <p>
              为改善我们的产品或服务、向您提供个性化的信息搜索及网络借贷信息中介服务，我们会根据您的浏览及搜索记录、设备信息、位置信息、订单信息，提取您的浏览、搜索偏好、行为习惯、位置信息等特征，基于特征标签进行间接人群画像并展示、推送信息。
              <br />
              如果您不想接受我们给您发送的商业广告，您可随时通过相应产品退订功能取消。
            </p>
            <h4>(三)向您提供网络借贷信息中介服务</h4>
            <p>
              1、您向我们提供的信息
              <br />
              为便于向您交付商品或服务，您需要提供您的身份信息、联系方式、地址以及绑定银行卡信息。如您不提供上述信息，将无法注册账户或无法支付。同时为了验证该类信息的准确性和完整性，我们会将您提供的信息与合法存有您信息的机构(政府机关、事业单位、商业机构)进行验证核对;我们会对该等验证机构提供的信息来源合法性进行验证。
              <br />
              2、我们在您使用服务过程中收集的信息
              <br />
              为向您提供更契合您需求的页面展示和搜索结果、了解产品适配性、识别账号异常状态，我们会收集关于您使用的服务以及使用方式的信息并将这些信息进行关联，这些信息包括：
              <br />
              设备信息：我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息(例如设备型号、操作系统版本、设备设置、唯一设备标识符等软硬件特征信息)、设备所在位置相关信息(例如IP
              地址、GPS位置以及能够提供相关信息的Wi-Fi
              接入点、蓝牙和基站等传感器信息)。
              <br />
              日志信息：当您使用我们的网站或客户端提供的产品或服务时，我们会自动收集您对我们服务的详细使用情况，作为有关网络日志保存。例如您的搜索查询内容、IP地址、浏览器的类型、电信运营商、使用的语言、访问日期和时间及您访问的网页记录等。
              <br />
              请注意，单独的设备信息、日志信息等是无法识别特定自然人身份的信息。如果我们将这类非个人信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将该类个人信息做匿名化、去标识化处理。
              <br />
              为展示您账户的投资信息，我们会收集您在使用我们服务过程中产生的投资信息用于向您展示及便于您对投资进行管理。
              <br />
              当您与我们联系时，我们可能会保存您的通信/通话记录和内容或您留下的联系方式等信息，以便与您联系或帮助您解决问题，或记录相关问题的处理方案及结果。
            </p>
            <h4>(四)为您提供安全保障</h4>
            <p>
              为提高您使用我们及我们关联公司、合作伙伴提供服务的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或钱趣多相关协议规则的情况，我们可能使用或整合您的会员信息、交易信息、设备信息、有关网络日志以及我们关联公司、合作伙伴取得您授权或依据法律共享的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。
            </p>
            <h4>(五)其他用途</h4>
            <p>
              我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。
            </p>
            <h4>(六)征得授权同意的例外</h4>
            <p>
              根据相关法律法规规定，以下情形中收集您的个人信息无需征得您的授权同意：
              <br />
              1、与国家安全、国防安全有关的；
              <br />
              2、与公共安全、公共卫生、重大公共利益有关的；
              <br />
              3、与犯罪侦查、起诉、审判和判决执行等有关的；
              <br />
              4、出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；
              <br />
              5、所收集的个人信息是您自行向社会公众公开的；
              <br />
              6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；
              <br />
              7、根据您的要求签订合同所必需的；
              <br />
              8、用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；
              <br />
              9、为合法的新闻报道所必需的；
              <br />
              10、学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；
              <br />
              11、法律法规规定的其他情形。
              <br />
              如我们停止运营钱趣多产品或服务，我们将及时停止继续收集您个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知您，对所持有的个人信息进行删除或匿名化处理。
            </p>
            <h3>二、我们如何使用Cookie和同类技术</h3>
            <h4>(一)Cookie</h4>
            <p>
              1、为确保网站正常运转,我们会在您的计算机或移动设备上存储名为Cookie的小数据文件.Cookie通常包含标识符、站点名称以及一些号码和字符，借助于Cookie,网站能够存储您的偏好等数据。
              <br />
              2、我们不会将Cookie用于本政策所述目的之外的任何用途。您可根据自己的偏好管理或删除
              Cookie。有关详情，请参见
              AboutCookies.org。您可以清除计算机上保存的所有
              Cookie，大部分网络浏览器都设有阻止 Cookie
              的功能。但如果您这么做，则需要在每一次访问我们的网站时更改用户设置。如需详细了解如何更改浏览器设置，请访问您使用的浏览器的相关设置页面。
            </p>
            <h4>(二)网站信标和像素标签</h4>
            <p>
              除Cookie外,我们还会在网站上使用网站信标和像素标签等其他同类技术,例如,我们向您发送的电子邮件可能含有链接至我们网站内容的点击URL,如果您点击该链接,我们则会跟踪此次点击,帮助我们了解您的产品或服务偏好并改善客户服务,网站信标通常是一种嵌入到网站或电子邮件中的透明图像,借助电子邮件中的像素标签,我们能够获知电子件是否被打开,如果您不希望自己的活动以这种方式被追踪,则可以随时从我们的寄信名单中退订。
            </p>
            <h4>(三)LocalStorage的使用</h4>
            <p>
              a)
              在您未拒绝接受localStorage的情况下，幕墙易会在您的计算机上设定或取用localStorage，以便您能登录或使用依赖于localStorage的www.efacade.cn服务或功能。幕墙易使用localStorage可为您提供更加周到的个性化服务，包括推广服务。
              <br />
              b)
              您有权选择接受或拒绝接受localStorage。您可以通过修改浏览器设置的方式拒绝接受localStorage。但如果您选择拒绝接受localStorage，则您可能无法登录或使用依赖于localStorage的www.efacade.cn服务或功能。
              <br />
              c) 通过幕墙易所设localStorage所取得的有关信息，将适用本政策；
            </p>
            <h3>三、我们如何共享、转让、公开披露您的个人信息</h3>
            <h4>(一)共享</h4>
            <p>
              我们不会与上海钱橙互联网金融信息服务有限公司以外的任何公司、组织和个人外享您的个人信息,但以下情况除外:
              <br />
              1、在获取明确同意的情况下共享:获得您的明确同意后,我们会与其他方共享您的个人信息。
              <br />
              2、我们可能会根据法律法规规定、诉讼争议解决需要，或按行政、司法机关依法提出的要求，对外共享您的个人信息。
              <br />
              3、与我们的附属公司共享:您的个人信息可能会与上海钱橙互联网金融信息服务有限公司的附属公司共享,我们只会共享必要的个人信息,且受本隐私政策中所声明目的的约束、附属公司如要改变个人信息的处理目的,将再次征求您的授权同意。
              <br />
              4、与授权合作伙伴共享,仅为实现本政策中声明的目的,我们的某些服务将由授权合作伙伴提供,我们可能会与合作伙伴共享您的某些个人信息,以提供更好的客户服务和用户体验,例如，您在我平台上进行出借或借款时，需要按照我平台要求添加银行存管银行的账户，进行存管服务,我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息,并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途。
              <br />
              目前,我们的授权合作伙伴包括以下2大类型:
              <br />
              4.1广告、分析服务类的授权合作伙伴,除非得到您的许可,否则我们不会将您的个人身份信息(指可以识别您身份的信息,例如姓名或电子邮箱,通过这些信息可以联系到您或识别您的身份)与提供广告、分析服务的合作伙伴外享,我们会向这此合作伙伴提供有关其广告覆盖面和有效性的信息,而不会提供您的个人身份信息,或者我们将这些信息进行汇总,以便它不会识别您个人。
              <br />
              4.2供应商、服务提供商和其他合作伙伴,我们将信息发送给在全球范围内支持我们业务的供应商、服务提供商和其他合作伙伴,这些支持包括提供技礙务,分析我们服务的使用方式,衡量广告和服务的有效性,提供客户服务、支付便利或进行学术研究和调査。
              <br />
              对我们与之共享个人信息的公司、组织和个人,我们会与其签署严格的保密协定,要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。
            </p>
            <h4>(二)转让</h4>
            <p>
              我们不会将您的个人信息转让给任何公司、组织和个人,但以下情况除外:
              <br />
              1、在获取明确同意的情况下转让:获得您的明确同意后,我们会向其他方转让您的个人信息;
              <br />
              2、在钱趣多服务提供者涉及合并、收购或破产清算时,如涉及个人信息转让,我们会在(要求新的持有您个人信息的公司、组织继续受此隐私政策的约束,否则我们将要求该公司、组织重新向您征求授权同意。
            </p>
            <h4>(三)公开披露</h4>
            <p>
              我们仅会在以下情况下,公开披露您的个人信息:
              <br />
              1、获得您明确同意后;
              <br />
              2、如果我们确定您出现违反法律法规或严重违反钱趣多相关协议规则的情况，或为保护钱趣多用户或公众的人身财产安全免遭侵害，我们可能依据法律法规或钱趣多相关协议规则征得您同意的情况下披露关于您的个人信息，包括相关违规行为以及钱趣多已对您采取的措施。例如，若您提供虚假信息违反钱趣多规则，我们可能会公开披露您的主体信息与处罚情况。
              <br />
              共享、转让、公开披露个人信息时事先征得授权同意的例外
            </p>
            <h4>
              (四)以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：
            </h4>
            <p>
              1、与国家安全、国防安全有关的；
              <br />
              2、与公共安全、公共卫生、重大公共利益有关的；
              <br />
              3、与犯罪侦查、起诉、审判和判决执行等有关的；
              <br />
              4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
              <br />
              5、您自行向社会公众公开的个人信息；
              <br />
              6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。
              <br />
              根据法律规定，共享、转让经去标识化处理的个人信息，且确保数据接收方无法复原并重新识别个人信息主体的，不属于个人信息的对外共享、转让及公开披露行为，对此类数据的保存及处理将无需另行向您通知并征得您的同意。
            </p>
            <h3>四、我们如何保护您的个人信息</h3>
            <p>
              (一)我们已使用符合业界标准的安全防护措施保护您提供的个人信息,防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丟失,我们会采取一切合理可行的措施,保护您的个人信息.例如,在您的浏览器与“服务”之间交换数据(如银行卡信息)时受ssL加密保护:我们同时对钱趣多网站提供https安全浏览方式;我们会使用加密技术确保数据的保密性,我们会使用受信赖的保护机制防止数据遭到恶意攻击;我们会部署访问控制机制,确保只有授权人员才可访问个人信息;以及我们会举办安全和隐私保护培训课程,加强员工对于保护个人信息重要性的认识。
              <br />
              (二)我们有行业先进的以数据为核心，围绕数据生命周期进行的数据安全管理体系，从组织建设、制度设计、人员管理、产品技术等方面多维度提升整个系统的安全性。
              <br />
              (三)我们会采取合理可行的措施，尽力避免收集无关的个人信息。我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。
              <br />
              (四)互联网并非绝对安全的环境，我们强烈建议您不要使用非钱趣多推荐的通信方式发送个人信息。您可以通过我们的服务建立联系和相互分享。当您通过我们的服务创建交流、交易或分享时，您可以自主选择沟通、交易或分享的对象，作为能够看到您的交易内容、联络方式、交流信息或分享内容等相关信息的第三方。
              <br />
              在使用钱趣多服务进行网上交易时，您不可避免地要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或联系地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息尤其是您的账户或密码发生泄露，请您立即联络钱趣多客服，以便我们根据您的申请采取相应措施。
              <br />
              请注意，您在使用我们服务时自愿共享甚至公开分享的信息，可能会涉及您或他人的个人信息甚至个人敏感信息，如您在评价时选择上传包含个人信息的图片。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。
              <br />
              请使用复杂密码，协助我们保证您的账号安全。我们将尽力保障您发送给我们的任何信息的安全性。如果我们的物理、技术或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。
              <br />
              (五)我们将定期更新并公开安全风险、个人信息安全影响评估等报告的有关内容,您可通过钱趣多公告的方式获得。
              <br />
              (六)在不幸发生个人信息安全事件后，我们将按照法律法规的要求向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。事件相关情况我们将以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。
              <br />
              同时，我们还将按照监管部门要求，上报个人信息安全事件的处置情况。
            </p>
            <h3>五、您的权利</h3>
            <h4>(一)访问您的个人信息</h4>
            <p>
              您有权访问您的个人信息，法律法规规定的例外情况除外。您可以通过以下方式自行访问您的个人信息：
              <br />
              账户信息——如果您希望访问或编辑您的账户中的个人基本资料信息和支付信息、更改您的密码、添加安全信息等，您可以通过登录账号通过“账户管理”执行此类操作。
              <br />
              如果您无法通过上述路径访问该等个人信息，您可以随时通过钱趣多客服与我们取得联系。我们将在15天内回复您的访问请求。
              <br />
              对于您在使用我们的产品或服务过程中产生的其他个人信息，我们将根据本条“(七)响应您的上述请求”中的相关安排向您提供。
            </p>
            <h4>(二)更正或补充您的个人信息</h4>
            <p>
              当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正或补充。您可以通过“(一)访问您的个人信息”中列明的方式提出更正或补充申请。
            </p>
            <h4>(三)删除您的个人信息</h4>
            <p>
              您可以通过“(一)访问您的个人信息”中列明的方式删除您的部分个人信息。
              <br />
              在以下情形中，您可以向我们提出删除个人信息的请求：
              <br />
              1、如果我们处理个人信息的行为违反法律法规；
              <br />
              2、如果我们收集、使用您的个人信息，却未征得您的明确同意；
              <br />
              3、如果我们处理个人信息的行为严重违反了与您的约定；
              <br />
              4、如果您不再使用我们的产品或服务，或您主动注销了账号；
              <br />
              5、如果我们永久不再为您提供产品或服务。
              <br />
              若我们决定响应您的删除请求，我们还将同时尽可能通知从我们处获得您的个人信息的主体，要求其及时删除，除非法律法规另有规定，或这些主体获得您的独立授权。
              <br />
              当您从我们的服务中删除信息后，我们可能不会立即从备份系统中删除相应的信息，但会在备份更新时删除这些信息。
            </p>
            <h4>(四)改变您授权同意的范围</h4>
            <p>
              每个业务功能需要一些基本的个人信息才能得以完成(见本隐私权政策“第三部分第一条”)。除此之外，对于额外个人信息的收集和使用，您可以与钱趣多客服联系给予或收回您的授权同意。
              <br />
              当您收回同意后，我们将不再处理相应的个人信息。但您收回同意的决定，不会影响此前基于您的授权而开展的个人信息处理。
            </p>
            <h4>(五)个人信息主体注销账户</h4>
            <p>
              您可以与钱趣多客服联系提交账户注销申请，我们在收到您的注销申请后会在15个工作日内为您注销账户。
              <br />
              在您主动注销账户之后，我们将停止为您提供产品或服务，根据适用法律的要求删除您的个人信息，或使其匿名化处理。
            </p>
            <h4>(六)约束信息系统自动决策</h4>
            <p>
              在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将在不侵害钱趣多商业秘密或其他用户权益、社会公共利益的前提下提供申诉方法。
            </p>
            <h4>(七)响应您的上述请求</h4>
            <p>
              为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。
              <br />
              我们将在15天内做出答复。如您不满意，还可以通过钱趣多客服发起投诉。
              <br />
              对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段(例如，需要开发新系统或从根本上改变现行惯例)、给他人合法权益带来风险或者非常不切实际的请求，我们可能会予以拒绝。
            </p>
            <h3>六、我们如何处理未成年人的个人信息</h3>
            <p>
              如果没有父母或监护人的同意，未成年人不得创建自己的用户账户。如您为未成年人的，建议您请您的父母或监护人仔细阅读本隐私权政策，并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。
              <br />
              对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。
            </p>
            <h3>七、您的个人信息如何在全球范围转移</h3>
            <p>
              我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内，以下情形除外：
              <br />
              1、法律法规有明确规定；
              <br />
              2、获得您的明确授权；
              <br />
              3、您通过互联网进行跨境交易等个人主动行为。
              <br />
              针对以上情形，我们会确保依据本隐私权政策对您的个人信息提供足够的保护。
            </p>
            <h3>八、本隐私权政策如何更新</h3>
            <p>
              我们的隐私权政策可能变更。
              <br />
              未经您明确同意，我们不会限制您按照本隐私权政策所应享有的权利。我们会在专门页面(www.qianquduo.com)上发布对隐私权政策所做的任何变更。
              <br />
              对于重大变更，我们还会提供更为显著的通知(包括我们会通过钱趣多公示的方式进行通知甚至向您提供弹窗提示)。
              <br />
              本政策所指的重大变更包括但不限于：
              <br />
              1、我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；
              <br />
              2、我们在控制权等方面发生重大变化。如并购重组等引起的所有者变更等；
              <br />
              3、个人信息共享、转让或公开披露的主要对象发生变化；
              <br />
              4、您参与个人信息处理方面的权利及其行使方式发生重大变化；
              <br />
              5、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；
              <br />
              6、个人信息安全影响评估报告表明存在高风险时。
              <br />
              我们还会将本隐私权政策的旧版本在钱趣多专门页面www.qianquduo.com存档，供您查阅。
            </p>
            <h3>九、如何联系我们:</h3>
            <p>
              您可以通过以下方式与我们联系，我们将在15天内回复您的请求：
              <br />
              1、如对本政策内容有任何疑问、意见或建议，您可通过钱趣多客服及钱趣多网服务中心(www.qianquduo.com)在线客服与我们联系；
              <br />
              2、如发现个人信息可能被泄露，您可以通过钱趣多全国服务热线400-656-8877投诉举报；
              <br />
              如果您对我们的回复不满意，特别是您认为我们的个人信息处理行为损害了您的合法权益，您还可以通过向被告住所地有管辖权的法院提起诉讼来寻求解决方案。
            </p>
          </div>
        </div>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default PrivacyPage
