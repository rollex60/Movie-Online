import { allActions } from "@/store/rootActions";
import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'


export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(allActions, dispatch),
    [dispatch])
}