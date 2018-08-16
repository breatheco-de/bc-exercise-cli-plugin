import React from 'react';
import ReactDOM from 'react-dom';
import  Loadable  from 'react-loadable';
import PropTypes from 'prop-types';
import bc from './bc.json';
import 'highlight.js/styles/monokai-sublime.css';
import Typography from 'typography'
import altonTheme from 'typography-theme-alton';
const typography = new Typography(altonTheme);
typography.injectStyles();

const Link = ({onClick, slug, children}) => (<a href={"#"+slug}>{children}</a>);
const Loading = () => (<div>Loading</div>);
const styles = {
    padding: "10px"
}
class Layout extends React.Component{
    constructor(){
        super();
        this.state = {
            current: null
        }
    }
    componentDidMount(){
        window.addEventListener("hashchange", () => this.loadInstructions());
        if(window.location.hash && window.location.hash!='#') this.loadInstructions();
    }
    loadInstructions(slug=null){
        if(!slug) slug = window.location.hash.slice(1,window.location.hash.length);
        if(slug=='' || slug=='/') this.setState({ current: null });
        else{
            this.setState({
                current: Loadable({
                  loader: () => import('./exercises/'+slug+'/README.md'),
                  loading: Loading
                })
            });
        }
    }
    render(){
        const Current = this.state.current;
        const exercisesHTML = bc.exercises.map(ex => (
            <li key={ex.slug}>
                <Link slug={ex.slug}>
                    {ex.title}
                </Link>
            </li>
        ));
        if(Current) return <div style={styles}><Current /></div>;
        else return (<ul>{exercisesHTML}</ul>);
    }
};

ReactDOM.render(<Layout />,document.querySelector('#myDiv'));