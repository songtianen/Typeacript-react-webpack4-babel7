import * as React from 'react'
import {message, notification} from 'antd'
// 这里使用到泛型来灵活化state和props的interface
export default class Component<p = {}, s = {}> extends React.Component<p, s> {
         public $message = message;
         public $notifiaction = notification;
       }
