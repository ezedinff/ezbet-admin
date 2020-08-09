import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Input, Form } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

import  './index.less'
import useAuthUser from "../../shared/hooks/useAuthUser";

const FormItem = Form.Item;

export const Login = () => {
        const {setAuthUser} = useAuthUser();
        const handleOk = (values: any) => {
           // dispatch({ type: 'login/login', payload: values })
        };

        return (
            <Fragment>
                <div className={'form'}>
                    <div className={'logo'}>
                        <img alt="logo" src={'logoPath'} />
                        <span>{'siteName'}</span>
                    </div>
                    <Form
                        onFinish={handleOk}
                    >
                        <FormItem name="username"
                                  rules={[{ required: true }]} hasFeedback>
                            <Input
                                placeholder={'Username'}
                            />
                        </FormItem>
                        <FormItem name="password"
                                  rules={[{ required: true }]} hasFeedback>
                            <Input
                                type="password"
                                placeholder={'Password'}
                            />
                        </FormItem>
                        <Row>
                            <Button
                                type="primary"
                                htmlType="submit"
                                /*loading={loading.effects.login}*/
                            >
                                Sign in
                            </Button>
                        </Row>
                    </Form>
                </div>
      {/*          <div className={styles.footer}>
                    <GlobalFooter links={footerLinks} copyright={config.copyright} />
                </div>*/}
            </Fragment>
        )
}

/*Login.propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}*/

export default Login