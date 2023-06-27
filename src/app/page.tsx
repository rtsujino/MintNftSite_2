import { MintFormClient } from '../components/MintFormClient';
import { MintFormServer } from '../components/MintFormServer';
import '../style/page.css';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

// ダミーのHTMLコードを作成
const html = '<!DOCTYPE html><html><body><h1>dummy</h1></body></html>';
// JSDOMを使用して仮想のDOMを作成
const dom = new JSDOM(html, { url: 'http://localhost' });
// 作成したDOMからwindowオブジェクトを取得
const window = dom.window;


const contractAddress = '0xF8c576E8C9919428E17Bfee79DD6e474703b516e';

export default function Home() {
  
  const isClient = typeof window !== 'undefined';

  return isClient ? (
    <MintFormClient contractAddress={contractAddress} />
  ) : (
    <MintFormServer contractAddress={contractAddress} />
  );
}
