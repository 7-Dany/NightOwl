import React, { useContext, useState } from 'react'
import { SocketContext } from '../../../Context/SocketContext'
import PrivateChannel from '../Components/PrivateChannel'
import { IPrivateConversation } from '../../../Types'

type UsePrivateChannelContainerReturn = {
  showPrivateChannels: boolean
  getConversations: (userConversations: IPrivateConversation[]) => (JSX.Element | undefined)[]
  handleShowPrivateChannels: (event: React.MouseEvent<HTMLDivElement>) => void
}

function usePrivateChannelContainer(): UsePrivateChannelContainerReturn {
  const [showPrivateChannels, setShowPrivateChannels] = useState(true)
  const { activeConversation } = useContext(SocketContext).SocketState

  function getConversations(userConversations: IPrivateConversation[]): (JSX.Element | undefined)[] {
    /** When conversation get active it will move to the top of the list */
    let conversations
    if (activeConversation?.conversation_id) {
      let chosenConversation
      const filteredConversations = userConversations.map(conversation => {
        if (conversation.conversation_id === activeConversation.conversation_id) {
          chosenConversation = <PrivateChannel key={conversation.conversation_id} {...conversation} />
        } else {
          return <PrivateChannel key={conversation.conversation_id} {...conversation} />
        }
      })
      conversations = [chosenConversation, ...filteredConversations]
    } else {
      conversations = userConversations.map(conversation => {
        return (
          <PrivateChannel key={conversation.conversation_id} {...conversation} />
        )
      })
    }
    return conversations
  }

  function handleShowPrivateChannels(event: React.MouseEvent<HTMLDivElement>) {
    /** Show or hide private conversations when the arrow get clicked */
    setShowPrivateChannels(prevShowPrivateChannels => !prevShowPrivateChannels)
  }

  return {
    getConversations,
    showPrivateChannels,
    handleShowPrivateChannels
  }
}

export default usePrivateChannelContainer