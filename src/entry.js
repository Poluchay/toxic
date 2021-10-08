import './theme/normalize.scss'
import './theme/style.scss'

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components', true, /^.*\.js$/));
requireAll(require.context('./pages', true, /^.*\.js$/));
