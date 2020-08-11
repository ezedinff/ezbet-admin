import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import {Button, Row, Input, Form, Alert} from 'antd'
import { GithubOutlined } from '@ant-design/icons'

import  './index.less'
import useAuthUser from "../../shared/hooks/useAuthUser";
import {useMutation} from "@apollo/react-hooks";
import {LOGIN} from "./gql";

const FormItem = Form.Item;

export const Login = (props: {data: any}) => {
        const {setAuthUser} = useAuthUser();
        const handleOk = async (values: any) => {
           // dispatch({ type: 'login/login', payload: values })
            console.log(values);
            const { username, password } = values;
            const response = await login({
                variables: {
                    username,
                    password,
                },
            });
            if (response) {
                const token = response && response.data && response.data.login && response.data.login.accessToken;
                if (token) {
                    setAuthUser(token);

                }
            }
        };

    const [login, { loading: isLogining, error, data: loginData }] = useMutation(LOGIN);

    React.useEffect(() => {
        if (loginData) {
        }
    }, [loginData]);

    React.useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);
    console.log(props);

        return props.data ? (
            <Fragment>
                <div className={'form'}>
                    <div className={'logo'}>
                        <img alt="logo" src={props.data.app.appLogo} />
                    </div>
                    {error ? <div><Alert message={error.graphQLErrors[0].message} type="error" /><br/></div> : null}
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
        ) : null;
}

/*Login.propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}*/

export default Login